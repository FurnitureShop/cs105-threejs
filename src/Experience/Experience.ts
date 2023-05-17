// import * as THREE from "three"
import * as THREE from "three"
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Utils/Time";
import World from "./World/World";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

export default class Experience {
    static instance: any;
    canvas: any;
    sizes!: Sizes;
    scene!: THREE.Scene;
    camera!: Camera;
    renderer!: Renderer;
    time!: Time;
    world!: World;
    resources!: Resources;

    constructor(canvas?: any) {
        if (Experience.instance) {
            return Experience.instance
        }

        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets)
        this.world = new World();

        //listen on "resize" event from EventEmitter
        this.time.on("resize", () => {
            this.resize()
        })
        //listen on "update" event from EventEmitter
        this.time.on("update", () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize();
        this.renderer.resize()
    }

    update() {
        this.camera.update();
        this.renderer.update();
    }
}