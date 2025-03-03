export class DemoHelper {

    constructor(cfg = {}) {
        this.viewer = cfg.viewer;
        this.startTime = null;
    }

    init(cfg = {}) {
        return new Promise((resolve, reject) => {
            this.startTime = performance.now();
            resolve();
        });
    }

    finished() {
        let endTime = performance.now();  // Get the precise ending time
        let elapsedTime = endTime - this.startTime;  // Calculate the elapsed time
        // if (this.viewer) {
        //     this.logInfo(`SceneModels: ${Object.keys(this.viewer.scene.models).length}`);
        //     this.logInfo(`SceneObjects: ${Object.keys(this.viewer.scene.objects).length}`);
        // }
        // if (this.data) {
        //     this.logInfo(`DataModels: ${Object.keys(this.data.models).length}`);
        //     this.logInfo(`DataObjects: ${Object.keys(this.data.objects).length}`);
        // }
        // if (this.viewer) {
        //     this.logInfo(`Scene AABB: [${trunc(this.viewer.scene.aabb)}]`);
        //     const views = Object.values(this.viewer.views);
        //     this.logInfo(`Views: ${views.length}`);
        //     if (views.length === 1) {
        //         const camera = views[0].camera;
        //         this.logInfo(`Camera looking at: [${Math.round(camera.look[0])}, ${Math.round(camera.look[1])}, ${Math.round(camera.look[2])}]`)
        //     }
        // }
        this.#signalFinished();
    }

    #signalFinished() {
        const div = document.createElement("div");
        div.id = "ExampleLoaded";
        document.body.appendChild(div);
    }
}
