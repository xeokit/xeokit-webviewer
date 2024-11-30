const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const ejs = require('ejs');
const markdownit = require('markdown-it');
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const rename = require("gulp-rename");
const replace = require('gulp-replace-task');

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
            markdown.utils.escapeHtml(str) +
            "</code></pre>"
        );
    }
});

function buildPages(baseDir) {
    const index = {
        pages: {},
        tagToPagesMap: {}
    };
    try {
        const docsLinks = JSON.parse(fs.readFileSync("./docsLinks.json", "utf8"));

        const docsLookup = JSON.parse(fs.readFileSync("./docsLookup.json", "utf8"));

        const DOCS_LOOKUP = {...docsLookup, ...docsLinks};
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
                            const tagToPagesMap = index.tagToPagesMap;
                            for (let tag of pageJSON.tags) {
                                let tagPages = tagToPagesMap[tag];
                                if (!tagPages) {
                                    tagToPagesMap[tag] = [pageId];
                                } else {
                                    if (!tagToPagesMap[tag].includes(pageId)) {
                                        tagToPagesMap[tag].push(pageId)
                                    }
                                }
                            }
                        }
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

                        fs.copyFileSync("./includes/page.html", templateIndexPath);

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
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }

    return index;
}

function wrapWordsWithLinks(text, wordMap) {

    Object.keys(wordMap).forEach(function (key) {
        const regex = new RegExp(`\\b${key}s?\\b`, 'g');
        text = text.replace(regex, (match) => {
            const entry = wordMap[key];
            const path = entry.path || "";
            // const kind = entry.kind || "";
            return /s$/i.test(match)
                ? `<a href="${path}" target="_blank">${key}</a>s`
                : `<a href="${path}" target="_blank">${key}</a>`;
        });
    });
    return text;
}

const baseDirectory = './pages';
const index = buildPages(baseDirectory);

//console.log(`Contents of index:`, index);

fs.writeFileSync("./pages/index.json", JSON.stringify(index, null, 2), 'utf8');

//const mdIndexPath2 = path.join(subDirPath, 'content.html')

fs.copyFileSync(`./includes/page-index.html`, `./pages/page-index.html`);

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
