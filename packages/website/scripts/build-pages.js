const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const ejs = require('ejs');
const markdownit = require('markdown-it');
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const rename = require("gulp-rename");
const replace = require('gulp-replace-task');
const imageThumbnail = require('image-thumbnail');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();


const markDownParser = markdownit({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre><code class="hljs">' +
                    hljs.highlight(str, {language: lang, ignoreIllegals: true}).value +
                    "</code></pre>"
                );
            } catch (__) {
            }
        }
        return (
            '<pre><code class="hljs">' +
        //    hljs.utils.escapeHtml(str) +
            "</code></pre>"
        );
    }
});

function buildPages(baseDir) {
    const index = {
        pages: {},
        tagsToPagesMap: {}
    };
    try {
        const docsLinks = JSON.parse(fs.readFileSync("./data/docsLinks.json", "utf8"));

        const docsLookup = JSON.parse(fs.readFileSync("./data/docsLookup.json", "utf8"));

        const DOCS_LOOKUP = {...docsLookup, ...docsLinks};

        console.log(DOCS_LOOKUP)
        const files = fs.readdirSync(baseDir);

        files.forEach(file => {

            const pageId = file;
            const subDirPath = path.join(baseDir, file);
            const stats = fs.statSync(subDirPath);

            if (stats.isDirectory()) {

                const indexPath = path.join(subDirPath, 'index.json');
                let pageJSON;

                if (fs.existsSync(indexPath)) {
                    try {
                        const data = fs.readFileSync(indexPath, 'utf8');
                        pageJSON = JSON.parse(data);
                        index.pages[file] = pageJSON;

                        if (pageJSON.tags) {
                            const tagsToPagesMap = index.tagsToPagesMap;
                            for (let tag of pageJSON.tags) {
                                let tagPages = tagsToPagesMap[tag];
                                if (!tagPages) {
                                    tagsToPagesMap[tag] = [pageId];
                                } else {
                                    if (!tagsToPagesMap[tag].includes(pageId)) {
                                        tagsToPagesMap[tag].push(pageId)
                                    }
                                }
                            }
                        }
                        (async function () {
                            try {
                                let thumbnailPath = pageJSON.thumbnail;
                                if (!thumbnailPath) {
                                    const imageFiles = await listImageFiles(subDirPath);
                                    if (imageFiles.length > 0) {
                                        for (let filePath of imageFiles) {
                                            if (!filePath.includes("_thumbnail.jpg")) {
                                                thumbnailPath = filePath;
                                                break;
                                            }
                                        }
                                    }
                                    if (!thumbnailPath) {
                                        thumbnailPath = "./../../images/xktWithTextures.png";
                                    }
                                } else {
                                    thumbnailPath = path.join(subDirPath, thumbnailPath);
                                }
                                const outThumbPath = path.join(subDirPath, `_thumbnail.jpg`);
                                let thumbnail = await imageThumbnail(thumbnailPath, {
                                    width: 300,
                                    jpegOptions: {
                                        force: true,
                                        quality: 60
                                    }
                                });
                                fs.writeFileSync(outThumbPath, thumbnail);
                            } catch (err) {
                                console.error(err);
                            }
                        })();

                    } catch (err) {
                        console.error(`Error reading or parsing JSON in file: ${indexPath}`, err);
                    }
                } else {
                    console.log(`index.json not found in ${subDirPath}`);
                }
                const mdIndexPath = path.join(subDirPath, 'index.md');
                const templateIndexPath = path.join(subDirPath, 'indexTemp.html');

                if (fs.existsSync(mdIndexPath)) {
                    try {
                        const md = fs.readFileSync(mdIndexPath, 'utf8');
                        const mdIndexPath2 = path.join(subDirPath, 'content.html');

                        fs.copyFileSync("./templates/page.html", templateIndexPath);

                        (async function convertMarkdownToHtml() {
                            const html = wrapWordsWithLinks(await markDownParser.render(md), DOCS_LOOKUP);
                            fs.writeFileSync(mdIndexPath2, html, 'utf8');
                            gulp.src([
                                templateIndexPath
                            ])
                                .pipe(fileinclude({
                                    filters: {
                                        //markdown: markdown.parse
                                    }
                                }))
                                .pipe(rename("index.html"))
                                .pipe(
                                    replace({
                                        patterns: [
                                            {
                                                match: 'title',
                                                replacement: pageJSON.title
                                            },
                                            {
                                                match: 'subtitle',
                                                replacement: pageJSON.subtitle || ""
                                            }
                                        ]
                                    })
                                )
                                .pipe(gulp.dest(`${subDirPath}/`))
                                .on('end', function () {
                                    fs.unlink(templateIndexPath, (err) => {
                                    });
                                    fs.unlink(mdIndexPath2, (err) => {
                                    });
                                });
                        })();

                    } catch (err) {
                        console.error(`Error reading or parsing file: ${indexPath}`, err);
                    }
                } else {
                    console.log(`index.json not found in ${subDirPath}`);
                }
            }
        });

        gulp.src([
            "./templates/examples-index.html"
        ])
            .pipe(fileinclude({
                filters: {
                    //markdown: markdown.parse
                }
            }))
            .pipe(rename("index.html"))
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'title',
                            replacement: "Examples"
                        },
                        {
                            match: 'subtitle',
                            replacement: "More examples than ever"
                        }
                    ]
                })
            )
            .pipe(gulp.dest(`./examples/`))
            .on('end', function () {
            });

        gulp.src([
            "./templates/index.html"
        ])
            .pipe(fileinclude({
                filters: {
                    //markdown: markdown.parse
                }
            }))
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'title',
                            replacement: "Examples"
                        },
                        {
                            match: 'subtitle',
                            replacement: "More examples than ever"
                        }
                    ]
                })
            )
            .pipe(gulp.dest(`./`))
            .on('end', function () {
            });

    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }

    return index;
}

async function listImageFiles(directory) {
    try {
        const files = await fs.readdirSync(directory);
        const imageFiles = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
            })
            .map(file => path.join(directory, file)); // Get full paths
        return imageFiles;
    } catch (err) {
        console.error(`Error reading directory: ${err.message}`);
        return [];
    }
}

function wrapWordsWithLinks(text, wordMap) {

    Object.keys(wordMap).forEach(function (key) {
        const regex = new RegExp(`\\b${key}s?\\b`, 'g');
        text = text.replace(regex, (match) => {
            const entry = wordMap[key];
            const path = entry.path || "";
            // const kind = entry.kind || "";
            return /s$/i.test(match)
                ? `<a href="${path}" target="_parent">${key}</a>s`
                : `<a href="${path}" target="_parent">${key}</a>`;
        });
    });
    return text;
}

const baseDirectory = './pages';
const index = buildPages(baseDirectory);

fs.writeFileSync("./pages/index.json", JSON.stringify(index, null, 2), 'utf8');

//const mdIndexPath2 = path.join(subDirPath, 'content.html')

fs.copyFileSync(`./templates/page-index.html`, `./pages/page-index.html`);

gulp.src([
    './pages/page-index.html'
])
    .pipe(fileinclude({
        filters: {
            //markdown: markdown.parse
        }
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(`./pages/`));
