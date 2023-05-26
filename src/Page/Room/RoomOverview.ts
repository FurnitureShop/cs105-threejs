import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
import Page from "../Page";
import Wall from "../World/Wall";
import Experience from "../../Experience/Experience";

export default class RoomOverview extends EventEmitter {
	private page;
	private scene: THREE.Scene;
	private camera: Camera;
	private resources: any;
	// private sizes: Sizes;
	// private world: World;
	private room?: THREE.Group;
	private roomChildren?: { [key in string]: THREE.Object3D<THREE.Event> };
	// Store queue animation and excute by time line
	private timeline?: gsap.core.Timeline;
	// private device: string;
  wall: any;

	constructor() {
		super();
		this.page = new Experience();
		this.scene = this.page.scene;
		this.camera = this.page.camera;
    this.addWall();
		// this.resources = this.page.resources;
		// this.sizes = this.page.sizes;
		// this.world = this.page.world;
		// this.device = this.sizes.device;

		// this.sizes.on("switchdevice", (device: string) => {
		// 	this.device = device;
		// });

		// this.world.on("worldready", () => {
		// 	this.setAssets();
		// 	this.playIntro();
		// });
	}

  addWall() {
    this.wall = new Wall();
  }

	// setAssets() {
	// 	convertDivToSpan(document.querySelector(".intro-text"));
	// 	convertDivToSpan(document.querySelector(".room-title"));
	// 	this.room = this.world.room?.actualRoom;
	// 	this.roomChildren = this.world.room?.roomChildren;
	// 	console.log(this.room);
	// 	console.log(this.roomChildren?.cube);
	// }

	// async playIntro() {
	// 	await this.firstIntro();
	// 	this.world;
	// }

	// firstIntro() {
	// 	return new Promise((resolve) => {
	// 		console.log(this.roomChildren?.cube.userData);
	// 		if (!this.roomChildren || !this.room) return;
	// 		this.timeline = GSAP.timeline();
	// 		this.timeline.to(".preloader", {
	// 			opacity: 0,
	// 			delay: 1,
	// 			onComplete: () => {
	// 				document.querySelector(".preloader")?.classList.add("hidden");
	// 			},
	// 		});
	// 		if (this.device === "desktop") {
	// 			this.timeline
	// 				.to(
	// 					this.roomChildren?.cube.scale,
	// 					{
	// 						x: 1.4,
	// 						y: 1.4,
	// 						z: 1.4,
	// 						ease: "back.out(2.5)",
	// 						duration: 0.7,
	// 					},
	// 					"init"
	// 				)
	// 				.to(
	// 					this.roomChildren.cube.position,
	// 					{
	// 						x: 0.638711,
	// 						y: -1.15,
	// 						z: 1.3243,
	// 					},
	// 					"init"
	// 				)
	// 				.to(this.room.position, {
	// 					x: -1,
	// 					ease: "power1.out",
	// 					duration: 0.7,
	// 				});
	// 		} else {
	// 			this.timeline
	// 				.to(this.roomChildren?.cube.scale, {
	// 					x: 1.4,
	// 					y: 1.4,
	// 					z: 1.4,
	// 					ease: "back.out(2.5)",
	// 					duration: 0.7,
	// 				})
	// 				.to(this.room.position, {
	// 					z: -1,
	// 					ease: "power1.out",
	// 					duration: 0.7,
	// 				});
	// 		}
	// 		this.timeline
	// 			.to(".intro-text .animatedis", {
	// 				yPercent: -100,
	// 				stagger: 0.05,
	// 				ease: "back.out(1.7)",
	// 			})
	// 			.to(
	// 				".intro-text .animatedis",
	// 				{
	// 					yPercent: 100,
	// 					stagger: 0.05,
	// 					ease: "back.in(1.7)",
	// 				},
	// 				"+=1"
	// 			)
	// 			.to(
	// 				this.room.position,
	// 				{
	// 					x: 0,
	// 					y: 0,
	// 					z: 0,
	// 					ease: "power1.out",
	// 					onComplete: () => {
	// 						document.querySelector(".intro")?.classList.add("hidden");
	// 					},
	// 				},
	// 				"same"
	// 			)
	// 			.to(
	// 				this.roomChildren.cube.scale,
	// 				{
	// 					x: 5,
	// 					y: 5,
	// 					z: 5,
	// 				},
	// 				"same"
	// 			)
	// 			.to(
	// 				this.roomChildren.cube.position,
	// 				{
	// 					x: 0.638711,
	// 					y: 2.5,
	// 					z: 1.3243,
	// 					onComplete: resolve
	// 				},
	// 				"same"
	// 			)
	// 	});
	// }

	// resize() {}
}
