import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";

export default class RoomBedroom1 extends EventEmitter {
	private experience;
	private timeline: gsap.core.Timeline;
	roomChildren!: { [key in string]: THREE.Object3D<THREE.Event> };
	cube: THREE.Object3D<THREE.Event>;
	backEvent!: () => void;

	constructor() {
		super();
		this.experience = new Experience();
		this.timeline = GSAP.timeline();
		// this.setAssets();
		this.cube = this.experience.world.cube.cubeRoom;
		this.on("done-loading-room", () => {
			this.roomChildren = this.experience.world.room.roomChildren;
			this.playLoadingRoom();
			this.attachBackEvent();
		});
	}

	playLoadingRoom() {
		window.removeEventListener(
			"mousemove",
			this.experience.world.room.mouseMoveEvent
		);
		document.querySelector(".btn-back")?.classList.toggle("hidden", false);
		document
			.querySelector(".toggle-bar-camera")
			?.classList.toggle("hidden", false);
		this.timeline
			.set(this.roomChildren.body.scale, {
				x: 1,
				y: 1,
				z: 1,
			})
			.to(this.cube.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1,
			})
			.to(
				".hero-main-title .animatedis",
				{
					yPercent: -100,
					stagger: 0.07,
					ease: "back.out(1.7)",
				},
				"introtext"
			)
			.to(
				".hero-main-description .animatedis",
				{
					yPercent: -100,
					stagger: 0.07,
					ease: "back.out(1.7)",
				},
				"introtext"
			)
			.to(
				".first-sub .animatedis",
				{
					yPercent: -100,
					stagger: 0.07,
					ease: "back.out(1.7)",
				},
				"introtext"
			)
			.to(
				".second-sub .animatedis",
				{
					yPercent: -100,
					stagger: 0.07,
					ease: "back.out(1.7)",
					onComplete: () => {
						document.querySelector("body")!.style.overflow = "scroll";
					},
				},
				"introtext"
			)
			.to(
				this.roomChildren.aquarium.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.5"
			)
			.to(
				this.roomChildren.clock.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.4"
			)
			.to(
				this.roomChildren.shelves.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.3"
			)
			.to(
				this.roomChildren.floor_items.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.2"
			)
			.to(
				this.roomChildren.desks.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.1"
			)
			.to(
				this.roomChildren.table_stuff.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				">-0.1"
			)
			.to(this.roomChildren.computer.scale, {
				x: 1,
				y: 1,
				z: 1,
				ease: "back.out(2.2)",
				duration: 0.5,
			})
			.to(
				this.roomChildren.chair.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				"chair"
			)
			.to(
				this.roomChildren.fish.scale,
				{
					x: 1,
					y: 1,
					z: 1,
					ease: "back.out(2.2)",
					duration: 0.5,
				},
				"chair"
			)
			.to(
				this.roomChildren.chair.rotation,
				{
					y: 4 * Math.PI + Math.PI / 4,
					ease: "power2.out",
					duration: 1,
				},
				"chair"
			)
			.to(".btn-back", {
				opacity: 1,
				duration: 0.5,
				pointerEvents: "auto",
				cursor: "pointer",
				onComplete: () => {
					window.addEventListener(
						"mousemove",
						this.experience.world.room.mouseMoveEvent
					);
				},
			});
	}

	attachBackEvent() {
		this.backEvent = this.backToHomePage.bind(this);
		document
			.querySelector(".btn-back")
			?.addEventListener("click", this.backEvent);
	}

	backToHomePage() {
		document
			.querySelector(".btn-back")
			?.removeEventListener("click", this.backEvent);
		document
			.querySelector(".toggle-bar-camera")
			?.classList.toggle("hidden", true);
		// Enable to fix bug shadow when scale big cube
		const aquariumMaterial = (
			this.roomChildren.aquarium.children[0] as THREE.Mesh
		).material as THREE.MeshPhysicalMaterial;
		aquariumMaterial.depthTest = true;
		aquariumMaterial.depthWrite = true;
		this.timeline
			.to(this.cube.scale, {
				x: 10,
				y: 10,
				z: 10,
			})
			.set(this.roomChildren.body.scale, {
				x: 0,
				y: 0,
				z: 0,
			})
			.to(
				".hero-main-title .animatedis",
				{
					yPercent: 100,
					stagger: 0.07,
					ease: "back.in(1.7)",
				},
				"introtext"
			)
			.to(
				".hero-main-description .animatedis",
				{
					yPercent: 100,
					stagger: 0.07,
					ease: "back.in(1.7)",
				},
				"introtext"
			)
			.to(
				".first-sub .animatedis",
				{
					yPercent: 100,
					stagger: 0.07,
					ease: "back.in(1.7)",
				},
				"introtext"
			)
			.to(
				".second-sub .animatedis",
				{
					yPercent: 100,
					stagger: 0.07,
					ease: "back.in(1.7)",
				},
				"introtext"
			)
			.to(".btn-back", {
				opacity: 0,
				duration: 0.5,
				pointerEvents: "none",
				cursor: "none",
				// pointerEvents: 'auto',
				onComplete: () => {
					this.experience.world.room.clearRoom();
					window.removeEventListener(
						"mousemove",
						this.experience.world.room.mouseMoveEvent
					);
					document.querySelector(".btn-back")?.classList.toggle("hidden", true);
					document.querySelector("body")!.style.overflow = "hidden";
					this.experience.world.emit("changehomepage");
				},
			});
	}
}
