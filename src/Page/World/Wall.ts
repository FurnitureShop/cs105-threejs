import * as THREE from "three";
import Page from "../Page.js";

export default class Wall {
	page: Page;
	scene: THREE.Scene;
	geometry!: THREE.PlaneGeometry;
	material!: THREE.MeshStandardMaterial;
	plane!: THREE.Mesh;

	constructor() {
		this.page = new Page();
		this.scene = this.page.scene;

		this.setFloor();
		// this.setCircles();
	}

	setFloor() {
		this.geometry = new THREE.PlaneGeometry(2, 4);
		this.material = new THREE.MeshStandardMaterial({
			color: 0x000123,
			side: THREE.DoubleSide,
		});
        this.scene.add(new THREE.AxesHelper(10))
		this.plane = new THREE.Mesh(this.geometry, this.material);

		this.scene.add(this.plane);
		this.plane.rotation.x = 87;
		this.plane.position.y = 0.25;
		this.plane.position.z = -1;
		this.plane.receiveShadow = true;
	}

	resize() {}

	update() {}
}
