import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Environment from "./Environment";
import assets from "../Utils/assets";
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";
import RoomOverview from "../Room/RoomOverview";

export default class World extends EventEmitter {
	experience: Experience;
	room!: Room;
	sizes: any;
	scene: THREE.Scene;
	canvas: any;
	camera: any;
	resources: any;
	environment!: Environment;
	controls!: Controls;
	floor!: Floor;
	currentScene: any;

	constructor() {
		super();

		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;

		this.resources.on("ready", () => {
			this.environment = new Environment();
			this.floor = new Floor();
			this.room = new Room(assets[0].name);
         // Disable scroll when in homepage
			if (document.querySelector("body")) {
				(document.querySelector("body") as HTMLElement).style.overflow =
					"hidden";
			}
			// this.controls = new Controls();
			this.emit("worldready");
			// console.log("room created")
		});

		this.on("changehomepage", () => {
			this.currentScene = new RoomOverview();
		});
	}

	resize() {}

	update() {
		if (this.room) {
			this.room.update();
		}
		if (this.controls) {
			this.controls.update();
		}
	}
}
