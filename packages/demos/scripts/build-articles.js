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

function buildArticles(baseDir) {
    const index = {
        articles: {},
        tagToArticlesMap: {}
    };
    try {
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
                            const tagToArticlesMap = index.tagToArticlesMap;
                            for (let tag of articleJSON.tags) {
                                let tagArticles = tagToArticlesMap[tag];
                                if (!tagArticles) {
                                    tagToArticlesMap[tag] = [articleId];
                                } else {
                                    if (!tagToArticlesMap[tag].includes(articleId)) {
                                        tagToArticlesMap[tag].push(articleId)
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

                        fs.copyFileSync("./includes/article.html", templateIndexPath);

                        (async function convertMarkdownToHtml() {
                            const html = await markDownParser.render(md);
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
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }

    return index;
}

const baseDirectory = './articles';
const index = buildArticles(baseDirectory);

//console.log(`Contents of index:`, index);

fs.writeFileSync("./articles/index.json", JSON.stringify(index, null, 2), 'utf8');

//const mdIndexPath2 = path.join(subDirPath, 'content.html')

fs.copyFileSync(`./includes/article-index.html`, `./articles/article-index.html`);

gulp.src([
    './articles/article-index.html'
])
    .pipe(fileinclude({
        filters: {
            //markdown: markdown.parse
        }
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(`./articles/`));
