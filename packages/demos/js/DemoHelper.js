import {DOC_LINKS} from "./docLinks.js";

export class DemoHelper {

    constructor(cfg = {}) {

        let div;

        if (cfg.elementId) {
            div = document.getElementById(cfg.elementId);
        } else {
            div = document.getElementById("info-container");
            if (!div) {
                div = document.createElement('div');
                div.id = 'info-container';
                div.className = 'info-container';
                document.body.appendChild(div);
            }
        }

        this.viewer = cfg.viewer;
        this.data = cfg.data;
        this.index = null;
        this.gitHubDataDir = cfg.gitHubDataDir || "https://github.com/xeokit/sdk/tree/develop/packages/demos/data/";
        this.statusContainer = div;
        this.startTime = null;
        this.assets = [];
        this.steps = [];
        this.info = [];
    }

    init(cfg = {}) {
        return new Promise((resolve, reject) => {
            this.statusContainer.innerHTML = '';
            const logDescription = () => {
                const descElement = document.createElement('div');
                descElement.className = 'status-description';
                descElement.innerHTML = this.index.description;
                this.statusContainer.appendChild(descElement);
            }
            if (cfg.index) {
                const index = cfg.index;
                this.index = index;
                logDescription();
                if (index.summary) {
                    this.logTitle("Steps");
                    this.logItems(index.summary.split('.').filter(Boolean));
                }
                this.startTime = performance.now();
                resolve();
            } else {
                fetch("./index.json").then(response => {
                    response.json().then(index => {
                        this.index = index;
                        logDescription();
                        this.logTitle("Steps");
                        //    this.log(index.summary);
                        this.logItems(index.summary.split('.').filter(Boolean));
                        this.startTime = performance.now();
                        resolve();
                    });
                });
            }
        });
    }

    logItems(items) {
        const ol = document.createElement('ol');
        this.statusContainer.appendChild(ol);
        for (let item of items) {
            const li = document.createElement('li');
            li.className = 'status-message';
            li.innerHTML = wrapWordsWithLinks(item.trim(), DOC_LINKS) + ".";
            ol.appendChild(li);
        }
    }

    logUnorderedItems(items) {
        const ul = document.createElement('ul');
        this.statusContainer.appendChild(ul);
        for (let item of items) {
            const li = document.createElement('li');
            li.className = 'status-message';
            li.innerHTML = wrapWordsWithLinks(item.trim(), DOC_LINKS) + ".";
            ul.appendChild(li);
        }
    }

    log(msg, nolinks = false) {
        msg = nolinks ? msg : wrapWordsWithLinks(msg, DOC_LINKS);
        const statusElement = document.createElement('div');
        statusElement.className = 'status-message';
        statusElement.innerHTML = `<ul><li>${msg}</li></ul>`;
        this.statusContainer.appendChild(statusElement);
    }

    logTitle(title) {
        const h1 = document.createElement('h1');
        this.statusContainer.appendChild(h1);
        h1.innerText = title;
        this.statusContainer.appendChild(document.createElement('hr'));
    }

    logViewSource() {
        const viewSourceElement = document.createElement('div');
        viewSourceElement.className = 'status-message';
        viewSourceElement.innerHTML = `<ul><li><a href="">Source code</a></li></ul>`;
        this.statusContainer.appendChild(viewSourceElement);
    }

    logViewingModel(modelId) {
        this.logInfo(`Model: <a href="${this.gitHubDataDir}models/${modelId}" target="_parent">${modelId}</a>`);
    }

    logImportPipeline(pipelineId) {
        this.logInfo(`Import pipeline: <a href="" target="_parent">${pipelineId}</a>`);
    }

    logFetch(src, formatName) {
        this.log(`Fetch ${formatName}: <a target="_parent" href="${this.gitHubDataDir}/${truncateUntilSubstring(src, "models")}">${truncateUntilSubstring(src, "models")}</a>`);
    }

    logSceneInfo(scene) {
        this.logInfo(`SceneObjects: ${Object.keys(scene.objects).length}`);
        this.logInfo(`Scene ABB: ${scene.aabb}]`);
    }

    initWebIFC() {
        this.log(`Init WebIFC`);
    }

    logError(err) {
        this.log(`[ERROR] ${err}`);
    }

    logAsset(src, name) {
        this.assets.push({
            src,
            name,
        });
        //this.log(`Fetch ${formatName}: <a target="_parent" href="${this.gitHubDataDir}/${truncateUntilSubstring(src, "models")}">${truncateUntilSubstring(src, "models")}</a>`);
    }

    logInfo(msg) {
        this.info.push(msg);
        //this.log(`Fetch ${formatName}: <a target="_parent" href="${this.gitHubDataDir}/${truncateUntilSubstring(src, "models")}">${truncateUntilSubstring(src, "models")}</a>`);
    }

    finished() {
        let endTime = performance.now();  // Get the precise ending time
        let elapsedTime = endTime - this.startTime;  // Calculate the elapsed time
        if (this.viewer) {
            this.logInfo(`SceneModels: ${Object.keys(this.viewer.scene.models).length}`);
            this.logInfo(`SceneObjects: ${Object.keys(this.viewer.scene.objects).length}`);
        }
        if (this.data) {
            this.logInfo(`DataModels: ${Object.keys(this.data.models).length}`);
            this.logInfo(`DataObjects: ${Object.keys(this.data.objects).length}`);
        }
        if (this.viewer) {
            this.logInfo(`Scene AABB: [${trunc(this.viewer.scene.aabb)}]`);
            const views = Object.values(this.viewer.views);
            this.logInfo(`Views: ${views.length}`);
            if (views.length === 1) {
                const camera = views[0].camera;
                this.logInfo(`Camera looking at: [${Math.round(camera.look[0])}, ${Math.round(camera.look[1])}, ${Math.round(camera.look[2])}]`)
            }
        }
        this.logInfo(`Demo completed in ${elapsedTime.toFixed(2)} ms`);
        if (this.info.length > 0) {
            this.logTitle("Stats");
            this.logUnorderedItems(this.info);
        }
        this.logTitle("Resources");
        this.logViewSource();
        if (this.assets.length > 0) {
            this.logTitle("Assets Loaded");
            const assets = [];
            for (let asset of this.assets) {
                assets.push(`<a target="_parent" href="${this.gitHubDataDir}/${truncateUntilSubstring(asset.src, "models")}">${truncateUntilSubstring(asset.src, "models")}</a>`);
            }
            this.logUnorderedItems(assets);
        }
    }
}

function trunc(vec) {
    const vec2 = [];
    for (let i =0, len = vec.length; i < len; i++) {
        vec2[i] = Math.trunc(vec[i] * 100) / 100;
    }
    return vec2;
}
function truncateUntilSubstring(str, substring) {
    const index = str.indexOf(substring);
    if (index !== -1) {
        return str.slice(index);
    }
    return str;
}

function wrapWordsWithLinks(text, wordMap) {
    Object.keys(wordMap).forEach(function (key) {
        const regex = new RegExp(`\\b${key}s?\\b`, 'gi');
        text = text.replace(regex, (match) => {
            return /s$/i.test(match)
                ? `<a href="${wordMap[key]}" target="_blank">${key}</a>s`
                : `<a href="${wordMap[key]}" target="_blank">${key}</a>`;
        });
    });
    return text;
}

function replaceWithPlural(inputString, targetWord, replacementWord) {


    // Create a regex to match singular and plural forms of the target word
    const regex = new RegExp(`\\b${escapedWord}s?\\b`, 'gi');

    // Replace with the appropriate singular or plural form
    return inputString.replace(regex, (match) => {
        // If the matched word is plural, return the plural form of the replacement
        return /s$/i.test(match) ? `${replacementWord}s` : replacementWord;
    });
}
