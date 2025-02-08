

let DOCS_LOOKUP;

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

        function loadCSS(filename) {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = filename;
            document.head.appendChild(link);
        }

        function loadJS(filename) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = filename;
            document.body.appendChild(script);
        }

        document.addEventListener("DOMContentLoaded", function() {
        loadCSS("https://unpkg.com/tippy.js@6/themes/light-border.css");
        loadJS("https://unpkg.com/@popperjs/core@2");
        loadJS("https://unpkg.com/tippy.js@6");
         });

        this.viewer = cfg.viewer;
        this.data = cfg.data;
        this.index = null;
        this.gitHubDataDir = cfg.gitHubDataDir || "https://github.com/xeokit/sdk/tree/develop/packages/website/";
        this.statusContainer = div;
        this.startTime = null;
        this.assets = [];
        this.steps = [];
        this.info = [];
        this.isViewModel = false;
    }

    init(cfg = {}) {

        return new Promise((resolve, reject) => {

            this.statusContainer.innerHTML = '';

            const logTitle = () => {
                const descElement = document.createElement('div');
                descElement.className = 'status-title';
                descElement.innerHTML = this.index.title;
                this.statusContainer.appendChild(descElement);
            }

            fetch("../../articles/index.json").then(response => {
                response.json().then(articlesIndex => {

                    this.articlesIndex = articlesIndex;

                    fetch("../../data/docsLinks.json").then(response => {
                        response.json().then(docsLinks => {

                            fetch("../../data/docsLookup.json").then(response => {
                                response.json().then(docsLookup => {

                                    DOCS_LOOKUP = {...docsLookup, ...docsLinks};

                                    if (cfg.index) {

                                        // Example / index descriptor JSON provided as argument

                                        const index = cfg.index;

                                        this.index = index;

                                        this.isViewModel = true;

                                        logTitle();

                                        if (index.summary) {
                                            this.logTitle("Steps");
                                            this.logItems(index.summary.split('.').filter(Boolean));
                                        }

                                        this.startTime = performance.now();

                                        resolve();

                                    } else {

                                        // Else load the example / article descriptor JSON

                                        fetch("./index.json").then(response => {

                                            response.json().then(index => {

                                                this.index = index;

                                                this.isViewModel = false;

                                                logTitle();

                                                this.logTitle("Steps");
                                                //    this.log(index.summary);
                                                if (index.summary) {
                                                    this.logItems(index.summary.split('.').filter(Boolean));
                                                }
                                                this.startTime = performance.now();
                                                resolve();
                                            });
                                        });
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    logItems(items) {
        const ol = document.createElement('ol');
        this.statusContainer.appendChild(ol);
        for (let item of items) {
            const li = document.createElement('li');
            li.className = 'status-message';
            li.innerHTML = wrapWordsWithLinks(item.trim(), DOCS_LOOKUP) + ".";
            ol.appendChild(li);
        }
    }

    logUnorderedItems(items) {
        const ul = document.createElement('ul');
        this.statusContainer.appendChild(ul);
        for (let item of items) {
            const li = document.createElement('li');
            li.className = 'status-message';
            li.innerHTML = item;//wrapWordsWithLinks(item.trim(), DOCS_LOOKUP) + ".";
            ul.appendChild(li);
        }
    }

    log(msg, nolinks = false) {
        msg = nolinks ? msg : wrapWordsWithLinks(msg, DOCS_LOOKUP);
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

    logExampleSource(exampleId) {
        const viewSourceElement = document.createElement('div');
        viewSourceElement.className = 'status-message';
        viewSourceElement.innerHTML = `<ul><li><a target="_parent" href='https://github.com/xeokit/sdk/tree/develop/packages/website/examples/${exampleId}'>Source code</a></li></ul>`;
        this.statusContainer.appendChild(viewSourceElement);
    }

    logViewerSource() {
        const viewSourceElement = document.createElement('div');
        viewSourceElement.className = 'status-message';
        viewSourceElement.innerHTML = `<ul><li><a target="_parent" href='https://github.com/xeokit/sdk/blob/develop/packages/website/models/viewModel.html'>Source code of viewer</a></li></ul>`;
        this.statusContainer.appendChild(viewSourceElement);
    }

    logViewingModel(modelId, pipelineId) {
        const viewSourceElement = document.createElement('div');
        viewSourceElement.className = 'status-message';
        viewSourceElement.innerHTML = `<ul><li>Model: <a href="${this.gitHubDataDir}models/${modelId}/${pipelineId}" target="_parent">${modelId}</a></li></ul>`;
        this.statusContainer.appendChild(viewSourceElement);
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
        this.logTitle("Resources");
        if (this.index) {
            if (this.index.type === "example") {
                if (this.index.id !== undefined) {
                    this.logExampleSource(this.index.id);
                }
            } else {
                this.logViewerSource();

            }
        }

        if (this.articlesIndex && this.articlesIndex.articles && Object.keys(this.articlesIndex.articles).length > 0) {

            // this.logTitle("Artices");
            // const items = [];
            // for (let tutorialPageId of this.articlesIndex.articles) {
            //     const tutorialPage = this.articlesIndex.articles[tutorialPageId];
            //     items.push(`<a target="_parent" style="font-style: italic" href="./../../articles/${tutorialPageId}/index.html">${tutorialPage.title}</a>`);
            // }
            // this.logUnorderedItems(items);
        }

        if (this.index && this.index.models && this.index.models.length > 0) {
            this.logTitle("Models");
            const items = [];
            for (let asset of this.index.models) {
                items.push(`<a target="_parent" href="${this.gitHubDataDir}/models/${asset}"><pre>${asset}</pre></a>`);
            }
            this.logUnorderedItems(items);
        }
        if (this.info.length > 0) {
            this.logTitle("Stats");
            this.logUnorderedItems(this.info);
        }

        // Pass page stats to parent

        // const div = document.createElement("div");
        // div.id = "demoLoaded";
        //  div.innerText = JSON.stringify(pageStats);
        // document.body.appendChild(div);

        // Make tooltips
        const interval = setInterval(() => {
            if (window.tippy) {
                window.tippy('.doc-link', {
                    content(reference) {
                        const id = reference.getAttribute('data-template')
                        const container = document.createElement('div')
                        const linkedTemplate = document.getElementById(id)
                        const node = document.importNode(linkedTemplate.content, true)
                        container.appendChild(node)
                        return container
                    },
                    // placement: 'top-end',
                    // arrow: true,
                    // animation: 'scale',
                    theme: 'light-border',
                    //   duration: [200, 150],
                    trigger: 'mouseenter focus',
                    hideOnClick: false,
                    // interactive: true,
                    inertia: true,
                });
                clearInterval(interval);
            }
        }, 200);
    }
}


function trunc(vec) {
    const vec2 = [];
    for (let i = 0, len = vec.length; i < len; i++) {
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
    function capitalizeFirstLetter(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    Object.keys(wordMap).forEach(function (key) {
        const expr = `${key}`;
        const regex = new RegExp(`\\b${expr}?\\b`, 'g');
        text = text.replace(regex, (match) => {
            const entry = wordMap[key];
            const path = entry.path || "";
            return `<a class="doc-link" data-template="${key}_template"  href="${path}" target="_parent">${key}</a>
            <template id="${key}_template">
                <p style="font-weight: lighter; color: grey;  font-size: smaller; padding-top:0">@xeokit/sdk / ${entry.namespace} / ${key} </p>
                <p style="font-weight: bold; font-size: larger; margin: 0; padding-top:0">${capitalizeFirstLetter(entry.kind)} ${key}</p>
                <p style="font-weight: normal; margin-top: 5px; margin-bottom: 0; padding-top:0; padding-bottom: 0;">${entry.summary}</p>
            </template>`;
        });
    });
    return text;
}
