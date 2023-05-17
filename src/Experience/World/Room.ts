import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    experience: Experience;
    scene: THREE.Scene;
    resources: any;
    room: any;

    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.room = this.resources.items["room_01"].scene
        // console.log(this.room)
        this.setModel();
    }

    setModel() {
        this.scene.add(this.room)
    }

    resize() {

    }

    update() {

    }
}