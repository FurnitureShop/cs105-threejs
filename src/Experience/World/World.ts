import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Environment from "./Environment";

export default class World {
    experience: Experience;
    room!: Room;
    sizes: any;
    scene: THREE.Scene;
    canvas: any;
    camera: any;
    resources: import("d:/git/cs105-threejs/src/Experience/Utils/Resources").default;
    environment!: Environment;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment()
            this.room = new Room();
            // console.log("room created")
        })
    }

    resize() {

    }

    update() {

    }
}