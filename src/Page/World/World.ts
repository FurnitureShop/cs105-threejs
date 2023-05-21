import * as THREE from "three";
// import Experience from "../Experience.js";

import Room from "./Room.js";
// import Floor from "./Floor.js";
// import Controls from "./Controls.js";
// import Environment from "./Environment.js";
import { EventEmitter } from "events";
import Page from "../Page";
import Sizes from "../Utils/Size.js";
import Camera from "../Camera.js";
import Resources from "../Utils/Resources.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";

export default class World extends EventEmitter {
  page: Page;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas?: Element;
  camera: Camera;
  resources: Resources;
  // theme: any;
  environment?: Environment;
  floor?: Floor;
  room?: Room;

    constructor() {
        super();
        this.page = new Page();
        this.sizes = this.page.sizes;
        this.scene = this.page.scene;
        this.canvas = this.page.canvas;
        this.camera = this.page.camera;
        this.resources = this.page.resources;
        // this.theme = this.page.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.floor = new Floor();
            this.room = new Room();
            // this.controls = new Controls();
            this.emit("worldready");
        });

        // this.theme.on("switch", (theme) => {
        //     this.switchTheme(theme);
        // });

        // this.sizes.on("switchdevice", (device) => {
        //     this.switchDevice(device);
        // });
    }

    // switchTheme(theme) {
    //     if (this.environment) {
    //         this.environment.switchTheme(theme);
    //     }
    // }

    // switchDevice(device) {
    //     if (this.controls) {
    //         this.controls.switchDevice(device);
    //     }
    // }

    resize() {}

    update() {
        if (this.room) {
            this.room.update();
        }
        // if (this.controls) {
        //     this.controls.update();
        // }
    }
}