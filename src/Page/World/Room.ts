import * as THREE from "three";
import Resources from "../Utils/Resources";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import Page from "../Page";
import { HEIGHT, INTENSITY, WIDTH } from "../../constant/rectLight";
import GSAP from "gsap";

type LerpType = {
	current: number;
	target: number;
	ease: number;
};

export default class Room {
	private page: Page;
	private scene: THREE.Scene;
	private resources: Resources;
	private sizes: any;
	private room: GLTF;
	actualRoom: THREE.Group;
	roomChildren: { [key in string]: THREE.Object3D<THREE.Event> };
	private lerp: LerpType;
	private rotation: number = 0;

	constructor() {
		this.page = new Page();
		this.scene = this.page.scene;
		this.resources = this.page.resources;
		this.room = this.resources.items.cube;
		this.actualRoom = this.room.scene;
		this.roomChildren = {};
		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
	}

	setModel() {
		this.actualRoom.children.forEach((child) => {
			child.castShadow = true;
			child.receiveShadow = true;

			if (child instanceof THREE.Group) {
				child.children.forEach((groupChild) => {
					groupChild.castShadow = true;
					groupChild.receiveShadow = true;
				});
			}

			child.scale.set(0, 0, 0);
			if (child.name === "Cube") {
				child.position.set(0, -1.5, 0);
        child.rotation.y = Math.PI / 4;
			}

			this.roomChildren[child.name.toLowerCase()] = child;
		});

		// const rectLightHelper = new RectAreaLightHelper(rectLight);
		// rectLight.add(rectLightHelper);
		// console.log(this.room);

		this.scene.add(this.actualRoom);
		this.actualRoom.scale.set(0.11, 0.11, 0.11);

		this.scene.add(this.actualRoom);
	}

	//   setAnimation() {
	//     this.mixer = new THREE.AnimationMixer(this.actualRoom);
	//     this.swim = this.mixer.clipAction(this.room.animations[0]);
	//     this.swim.play();
	// }

	onMouseMove() {
		window.addEventListener("mousemove", (e) => {
			this.rotation =
				((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
			this.lerp.target = this.rotation * 0.05;
		});
	}

	resize() {}

	update() {
		this.lerp.current = GSAP.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.actualRoom.rotation.y = this.lerp.current;

		// this.mixer.update(this.time.delta * 0.0009);
	}
}
