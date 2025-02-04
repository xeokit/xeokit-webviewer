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

//const base = "http://localhost:8080";
const base = "https://xeokit.github.io/sdk/";

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
        articles: {},
        tagsToArticlesMap: {}
    };
    try {
        const docsLinks = JSON.parse(fs.readFileSync("./data/docsLinks.json", "utf8"));
        const docsLookup = JSON.parse(fs.readFileSync("./data/docsLookup.json", "utf8"));
        const DOCS_LOOKUP = {...docsLookup, ...docsLinks};
        const files = fs.readdirSync(baseDir);

        files.forEach(file => {

            const articleId = file;
            const subDirPath = path.join(baseDir, file);
            const stats = fs.statSync(subDirPath);

            if (stats.isDirectory()) {

                const indexPath = path.join(subDirPath, 'index.json');
                let articleJSON;

                if (fs.existsSync(indexPath)) {
                    try {
                        const data = fs.readFileSync(indexPath, 'utf8');
                        articleJSON = JSON.parse(data);
                        index.articles[file] = articleJSON;

                        if (articleJSON.tags) {
                            const tagsToArticlesMap = index.tagsToArticlesMap;
                            for (let tag of articleJSON.tags) {
                                let tagArticles = tagsToArticlesMap[tag];
                                if (!tagArticles) {
                                    tagsToArticlesMap[tag] = [articleId];
                                } else {
                                    if (!tagsToArticlesMap[tag].includes(articleId)) {
                                        tagsToArticlesMap[tag].push(articleId)
                                    }
                                }
                            }
                        }
                        (async function () {
                            try {
                                let thumbnailPath = articleJSON.thumbnail;
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
                                        thumbnailPath = "./../images/xktWithTextures.png";
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

                        fs.copyFileSync("./templates/article.html", templateIndexPath);

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
                                                match: 'base',
                                                replacement: base
                                            },
                                            {
                                                match: 'title',
                                                replacement: articleJSON.title
                                            },
                                            {
                                                match: 'subtitle',
                                                replacement: articleJSON.subtitle || ""
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

        gulp.src(["./templates/examples-index.html"])
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'base',
                            replacement: base
                        }
                    ]
                })
            )
            .pipe(fileinclude({}))
            .pipe(rename("index.html"))
            .pipe(gulp.dest(`./examples/`))
            .on('end', function () {});

        gulp.src(["./templates/models-index.html"])
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'base',
                            replacement: base
                        }
                    ]
                })
            )
            .pipe(fileinclude({}))
            .pipe(rename("index.html"))
            .pipe(gulp.dest(`./models/`))
            .on('end', function () {});

        gulp.src(["./templates/article-index.html"])
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'base',
                            replacement: base
                        }
                    ]
                })
            )
            .pipe(fileinclude({}))
            .pipe(rename("index.html"))
            .pipe(gulp.dest(`./articles/`))
            .on('end', function () {});

        gulp.src(["./templates/index.html"])
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'base',
                            replacement: base
                        }
                    ]
                })
            )
            .pipe(fileinclude({}))
            .pipe(gulp.dest(`./`))
            .on('end', function () {});

        gulp.src(["./templates/api-docs.html"])
            .pipe(
                replace({
                    patterns: [
                        {
                            match: 'base',
                            replacement: base
                        }
                    ]
                })
            )
            .pipe(fileinclude({}))
            .pipe(gulp.dest(`./`))
            .on('end', function () {});

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

const baseDirectory = './articles';

const index = buildPages(baseDirectory);

fs.writeFileSync("./articles/index.json", JSON.stringify(index, null, 2), 'utf8');

