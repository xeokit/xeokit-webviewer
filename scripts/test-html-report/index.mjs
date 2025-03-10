import { readFile, readdir, writeFile } from 'fs/promises';
import { parse } from 'node-html-parser';

const source = './packages';
const templateSource = './scripts/test-html-report/template.html';
const destination = './test-report.html';


(async () => {
    console.log('\x1b[36m%s\x1b[0m', `\nGenerating summary!\n`);
    console.log('\x1b[36m%s\x1b[0m', `Source: ${source}`);
    console.log('\x1b[36m%s\x1b[0m', `Template: ${templateSource}`);
    console.log('\x1b[36m%s\x1b[0m', `Destination: ${destination}\n`);

    const templateHtmlFile = await readFile(templateSource, 'utf8').catch(() => null);

    if (!templateHtmlFile) {
        console.log('No template.html found');
        return;
    }

    const templateRoot = parse(templateHtmlFile);
    const folders = await readdir(source);
    let htmlWithoutTests = '';

    for (const folder of folders) {
        const reportHtmlFile = await readFile(`${source}/${folder}/test-report.html`, 'utf8').catch(() => null);

        if (!reportHtmlFile) {
            htmlWithoutTests += `<div class="jesthtml-content"><header><h2>No test-report.html found in <a href="${source}/${folder}/"><mark>@xeokit/${folder}</mark></a></h2></header></div>`;
            console.log('\x1b[33m%s\x1b[0m', '\u26a0  No test-report.html found in', `\x1b[35m${folder}`);
            continue;
        }

        const templateMenu = templateRoot.querySelector('nav ul');
        templateMenu.insertAdjacentHTML('beforeend', `<li><a href="#${folder}">${folder}</a></li>`);

        const jestRoot = parse(reportHtmlFile);
        const jestContent = jestRoot.querySelector('.jesthtml-content');

        jestContent.querySelector('h1').remove();
        jestContent.querySelector('header').insertAdjacentHTML('afterbegin', `<h2 id="${folder}"><mark><a href="${source}/${folder}/">@xeokit/${folder}</a></mark> Tests</h2>`);

        templateRoot.querySelector('body').insertAdjacentHTML('beforeend', jestContent.outerHTML);
        console.log('\x1b[32m%s\x1b[0m', `\u2713  Included test-report.html from`, `\x1b[35m${folder}`);
    }

    templateRoot.querySelector('body').insertAdjacentHTML('beforeend', htmlWithoutTests);

    await writeFile(destination, templateRoot.outerHTML);

    console.log('\x1b[36m%s\x1b[0m', `\nGeneration complete!\n`);
})();

