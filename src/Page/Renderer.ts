import * as THREE from "three";
import Page from "./Page";
import Sizes from "./Utils/Size";

export default class Renderer {
	page: Page;
	sizes: Sizes;
	scene;
	canvas?: Element;
	camera;
  renderer!: THREE.WebGLRenderer;

	constructor() {
		this.page = new Page();
		this.sizes = this.page.sizes;
		this.scene = this.page.scene;
		this.canvas = this.page.canvas;
		this.camera = this.page.camera;

		this.setRenderer();
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});

		this.renderer.useLegacyLights = true;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.toneMapping = THREE.CineonToneMapping;
		this.renderer.toneMappingExposure = 1.75;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(this.sizes.pixelRatio);
	}

	resize() {
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(this.sizes.pixelRatio);
	}

	update() {
		this.renderer.render(this.scene, this.camera.orthographicCamera);
	}
}
