import * as THREE from "three";
import Preloader from "./Preloader";
import World from '../Page/World/World';
import Resources from "../Page/Utils/Resources";
import assets from '../Page/Utils/assets'

export default class HomePage {
	static instance: HomePage;
	canvas: Element | undefined;
	scene: THREE.Scene = new THREE.Scene();
	time: any;
	sizes: any;
	camera: any;
	renderer: any;
	resources: any;
	theme: any;
  world: World = new World();
  preloader: Preloader = new Preloader();

	constructor(canvas?: Element) {
		if (HomePage.instance) {
			return HomePage.instance;
		}
		HomePage.instance = this;
		this.canvas = canvas;
		// this.time = new Time();
		// this.sizes = new Sizes();
		// this.camera = new Camera();
		// this.renderer = new Renderer();
		// this.resources = new Resources(assets);
		// this.theme = new Theme();

	// 	this.preloader.on("enablecontrols", () => {
	// 		this.controls = new Controls();
	// 	});

	// 	this.sizes.on("resize", () => {
	// 		this.resize();
	// 	});
	// 	this.time.on("update", () => {
	// 		this.update();
	// 	});
	// }

	// resize() {
	// 	this.camera.resize();
	// 	this.world.resize();
	// 	this.renderer.resize();
	// }

	// update() {
	// 	this.preloader.update();
	// 	this.camera.update();
	// 	this.world.update();
	// 	this.renderer.update();
	// 	if (this.controls) {
	// 		this.controls.update();
	// 	}
	// }
  }
}
