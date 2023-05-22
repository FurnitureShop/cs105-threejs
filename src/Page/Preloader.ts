import { EventEmitter } from "events";
import * as THREE from "three";
import World from "./World/World";
import Page from "./Page";
import Camera from "./Camera";
import GSAP from "gsap";
import Sizes from "./Utils/Size";

export default class Preloader extends EventEmitter {
	private page;
	private scene: THREE.Scene;
	private camera: Camera;
	private resources: any;
	private sizes: Sizes;
	private world: World;
	private room?: THREE.Group;
	private roomChildren?: { [key in string]: THREE.Object3D<THREE.Event> };
	// Store queue animation and excute by time line
	private timeline?: gsap.core.Timeline;
	private device: string;

	constructor() {
		super();
		this.page = new Page();
		this.scene = this.page.scene;
		this.camera = this.page.camera;
		// this.resources = this.page.resources;
		this.sizes = this.page.sizes;
		this.world = this.page.world;
		this.device = this.sizes.device;

		this.sizes.on("switchdevice", (device: string) => {
			this.device = device;
		});

		this.world.on("worldready", () => {
			this.setAssets();
			this.playIntro();
		});
	}

	setAssets() {
		this.room = this.world.room?.actualRoom;
		this.roomChildren = this.world.room?.roomChildren;
		console.log(this.room);
		console.log(this.roomChildren?.cube);
	}

	async playIntro() {
		await this.firstIntro();
		this.world;
	}

	onClick(event: WheelEvent) {
		if (event.deltaY > 0) {
			console.log("ADD EVENT");
		}
	}

	firstIntro() {
		return new Promise((resolve) => {
			if (!this.roomChildren || !this.room) return;
			this.timeline = GSAP.timeline();

			this.timeline.to(".preloader", {
				opacity: 0,
				delay: 0,
				onComplete: () => {
					document.querySelector('.preloader')?.classList.add('hidden');
				}
			})

			if (this.device === "desktop") {
				this.timeline
					.to(this.roomChildren?.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: -1,
						ease: "power1.out",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: 0,
						y: 0,
						z: 0,
						ease: "power1.out",
						duration: 0.7,
						onComplete: resolve
					});
			} else {
				this.timeline
					.to(this.roomChildren?.cube.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						z: -1,
						ease: "power1.out",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: 1,
						ease: "power1.in",
						duration: 0.7,
						onComplete: resolve
					});
			}
		})
	}

	resize() {}
}
