import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import Camera from "../Camera";
import Wall from "../World/Wall";

export default class RoomOverview extends EventEmitter {
	private experience;
	// private scene: THREE.Scene;
	// private camera: Camera;
	// private resources: any;
	private timeline?: gsap.core.Timeline;
	wall!: Wall;
	cube: THREE.Object3D<THREE.Event>;
	private isMoving: boolean;
	private currentRoomIndex: number;

	constructor() {
		super();
		this.experience = new Experience();
		// this.scene = this.experience.scene;
		// this.camera = this.experience.camera;
		this.timeline = GSAP.timeline();
		this.cube = this.experience.world.room.roomChildren["cube"];
		this.isMoving = false;
		this.currentRoomIndex = 0;
		this.setAssets();
		this.attachClickEvent();
		this.attachRotateEvent();
		// this.resources = this.experience.resources;
		// this.sizes = this.experience.sizes;
		// this.world = this.experience.world;
		// this.device = this.sizes.device;

		// this.sizes.on("switchdevice", (device: string) => {
		// 	this.device = device;
		// });

		// this.world.on("worldready", () => {
		// 	this.setAssets();
		// 	this.playIntro();
		// });
	}

	setAssets() {
		this.wall = new Wall();
		this.wall.plane.scale.setY(0);
		this.introRoomTitle();
	}

	rotateCube() {
		const rotationDistance = Math.PI / 4;
		if (!this.isMoving) {
			this.timeline?.to(this.cube.rotation, {
				y: (2 * this.currentRoomIndex + 1) * rotationDistance,
				ease: "power1.out",
				duration: 1,
				onComplete: () => {
					this.isMoving = false;
					console.log("CUBE INDEX", this.currentRoomIndex);
				},
			});
			this.isMoving = true;
		}
	}

	attachRotateEvent() {
		let swipeStartX: number;
		let swipeEndX: number;
		let holdStartX: number;
		let prevRotationY: number;
		let isMoving: boolean;
		const eventRotateBlockOnHold = (event: MouseEvent) => {
			if (isMoving) return;
			const holdSwipeDistance = event.clientX - holdStartX;
			holdStartX = event.clientX;
			this.cube.rotation.y -= holdSwipeDistance / (window.innerWidth / 2);
		};

		document.addEventListener("mousedown", (event) => {
			if ((event.target as Element).className.includes("room-choice")) return;
			swipeStartX = event.clientX;
			holdStartX = event.clientX;
			prevRotationY = this.cube.rotation.y;
			document.addEventListener("mousemove", eventRotateBlockOnHold);
		});

		document.addEventListener(
			"mouseup",
			((event: MouseEvent) => {
				if ((event.target as Element).className.includes("room-choice")) return;
				document.removeEventListener(
					"mousemove",
					eventRotateBlockOnHold,
					false
				);
				swipeEndX = event.clientX;
				// const screenWidth = window.innerWidth;
				// const rotationDistance = Math.round((Math.PI / 4) * 100) / 100; // 90 degrees in radians
				this.currentRoomIndex = Math.round(
					(Math.round(this.cube.rotation.y / (Math.PI / 4)) - 1) / 2
				);
				this.updateRoomChoiceIndex();
				this.rotateCube();
			}).bind(this)
		);
	}

	introRoomTitle() {
		this.timeline
			?.to(this.wall.plane.scale, {
				y: 1,
				ease: "back.out(2.5)",
				duration: 0.7,
			})
			.to(".room-title .animatedis", {
				yPercent: -100,
				ease: "back.out(1.7)",
			})
			.to(".room-choice-container", {
				duration: 1,
				onComplete: () => {
					console.log(
						document.querySelector(".room-choice-container")?.classList
					);
					document
						.querySelector(".room-choice-container")
						?.classList.toggle("hidden", false);
				},
			});
	}

	attachClickEvent() {
		const rooms = document.querySelectorAll(".room-choice");
		rooms.forEach((room, index) => {
			// room.replaceWith(room.cloneNode(true));

			room.addEventListener("click", () => {
				if (this.isMoving) return;
				const roomDirection =
					Math.sign(this.currentRoomIndex) ||
					(Object.is(Math.sign(this.currentRoomIndex), -0) ? -1 : 1);
				this.currentRoomIndex =
					Math.floor(
						(this.currentRoomIndex > 0
							? this.currentRoomIndex - 1
							: this.currentRoomIndex) / rooms.length
					) *
						rooms.length +
					roomDirection *
						(this.currentRoomIndex > 0 ? rooms.length - index : index);
				this.updateRoomChoiceIndex();
				this.rotateCube();
			});
		});
	}

	updateRoomChoiceIndex() {
		const rooms = document.querySelectorAll(".room-choice");
		document
			.querySelector(".room-choice.active")
			?.classList.toggle("active", false);
		/**
		 * Because cube rotation left to right is anti-clockwise
		 * -> swipe from left to right to have choice swap from left to right => current room index is negative => Convert to positive to use to swap from left to right
		 * -> swipe from right to left to have choice swap from right to left => current room index is positive => Minus with room length to swap right to left
		 */
		const roomIndex =
			this.currentRoomIndex % rooms.length > 0
				? rooms.length - (this.currentRoomIndex % rooms.length)
				: Math.abs(this.currentRoomIndex % rooms.length);
		rooms[roomIndex].classList.toggle("active", true);
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
