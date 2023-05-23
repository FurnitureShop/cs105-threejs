import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
import Experience from "./Experience";
import convertDivToSpan from "./Utils/convertDivToSpan";
import Camera from "./Camera";
import Sizes from "./Utils/Sizes";
import World from "./World/World";
import Resources from "./Utils/Resources";
import RoomOverview from "../Page/Room/RoomOverview";

export default class Preloader extends EventEmitter {
	private experience;
	private scene: THREE.Scene;
	private camera: Camera;
	private resources: Resources;
	private sizes: Sizes;
	private world: World;
	private room?: THREE.Group;
	private roomChildren?: { [key in string]: THREE.Object3D<THREE.Event> };
	// Store queue animation and excute by time line
	private timeline?: gsap.core.Timeline;
	private device: string;
	currentRoomScene: any;
	// currentRoomScene?: RoomOverview;

	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.sizes = this.experience.sizes;
		this.world = this.experience.world;
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
		convertDivToSpan(document.querySelector(".intro-text"));
		convertDivToSpan(document.querySelector(".room-title"));
		convertDivToSpan(document.querySelector('.hero-main'));
		convertDivToSpan(document.querySelector('.hero-second'));
		// convertDivToSpan(document.querySelector(''));
		// convertDivToSpan(document.querySelector(''));

		this.room = this.world.room?.actualRoom;
		this.roomChildren = this.world.room?.roomChildren;
	}

	async playIntro() {
		await this.firstIntro();
		this.currentRoomScene = new RoomOverview();
	}

	firstIntro() {
		return new Promise((resolve) => {
			if (!this.roomChildren || !this.room) return;
			console.log(this.roomChildren)
			this.timeline = GSAP.timeline();
			this.timeline.to(".preloader", {
				opacity: 0,
				delay: 1,
				onComplete: () => {
					document.querySelector(".preloader")?.classList.add("hidden");
				},
			});
			if (this.device === "desktop") {
				this.timeline
					.to(
						this.roomChildren?.cube.scale,
						{
							x: 1.4,
							y: 1.4,
							z: 1.4,
							ease: "back.out(2.5)",
							duration: 0.7,
						},
						"init"
					)
					.to(
						this.roomChildren.cube.position,
						{
							x: 0.638711,
							y: -1.15,
							z: 1.3243,
						},
						"init"
					)
					.to(this.room.position, {
						x: -1,
						ease: "power1.out",
						duration: 0.7,
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
					});
			}
			this.timeline
				.to(".intro-text .animatedis", {
					yPercent: -100,
					stagger: 0.05,
					ease: "back.out(1.7)",
				})
				.to(
					".intro-text .animatedis",
					{
						yPercent: 100,
						stagger: 0.05,
						ease: "back.in(1.7)",
					},
					"+=1"
				)
				.to(
					this.room.position,
					{
						x: 0,
						y: 0,
						z: 0,
						ease: "power1.out",
						onComplete: () => {
							document.querySelector(".intro")?.classList.add("hidden");
						},
					},
					"same"
				)
			this.timeline.to(
				this.roomChildren.cube.scale,
				{
					x: 5,
					y: 5,
					z: 5,
				},
				"same"
			)
				.to(
					this.roomChildren.cube.position,
					{
						x: 0.638711,
						y: 2.5,
						z: 1.3243,
						onComplete: resolve
					},
					"same"
				)
		});
	}

	resize() { }

	update() {

	 }
}
