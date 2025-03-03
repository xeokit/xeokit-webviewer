const fs = require("fs");

        const examplesIndex = JSON.parse(fs.readFileSync("./examples/index.json", "utf8"));
        for (let exampleId in examplesIndex) {
            const exampleUrl = `http://localhost:${port}/examples/${exampleId}/index.json`;
            console.log(`Opening example: ${exampleUrl}`);
            await page.goto(exampleUrl);
            try {
                await page.waitForFunction(() => !!document.querySelector('#ExampleLoaded'));
                await page.screenshot({
                    path: `./examples/${exampleId}/index.png`,
                    fullPage: true
                });
                console.log(`Captured snapshot: ./examples/${exampleId}/index.png`);
                // Wait a bit between captures
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (e) {
                console.error(`Error capturing snapshot for ${exampleId}:`, e);
            }
        }
