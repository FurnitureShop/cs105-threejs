import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Page from "./Page.js";
import Sizes from "./Utils/Size.js";

export default class Camera {
	page: Page;
	sizes: Sizes;
	scene: THREE.Scene;
	private canvas?: Element;
	perspectiveCamera!: THREE.PerspectiveCamera;
	orthographicCamera!: THREE.OrthographicCamera;
	controls!: OrbitControls;

	constructor() {
		this.page = new Page();
		this.sizes = this.page.sizes;
		this.scene = this.page.scene;
		this.canvas = this.page.canvas;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();
		this.setOrbitControls();
	}

	createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspect,
			0.1,
			1000
		);
		this.scene.add(this.perspectiveCamera);
		this.perspectiveCamera.position.x = 29;
		this.perspectiveCamera.position.y = 14;
		this.perspectiveCamera.position.z = 12;
	}

	createOrthographicCamera() {
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.sizes.frustrum) / 2,
			(this.sizes.aspect * this.sizes.frustrum) / 2,
			this.sizes.frustrum / 2,
			-this.sizes.frustrum / 2,
			-50,
			50
		);

		this.orthographicCamera.position.y = 5.65;
		this.orthographicCamera.position.z = 10;
		this.orthographicCamera.rotation.x = -Math.PI / 6;

		this.scene.add(this.orthographicCamera);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(
			this.perspectiveCamera,
			this.canvas as HTMLElement
		);
		this.controls.enableDamping = true;
		this.controls.enableZoom = false;
	}

	resize() {
		// Updating Perspective Camera on Resize
		this.perspectiveCamera.aspect = this.sizes.aspect;
		this.perspectiveCamera.updateProjectionMatrix();

		// Updating Orthographic Camera on Resize
		this.orthographicCamera.left =
			(-this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.right =
			(this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.top = this.sizes.frustrum / 2;
		this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
		this.orthographicCamera.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
