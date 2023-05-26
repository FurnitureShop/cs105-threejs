import { EventEmitter } from "events";
import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience";
import Wall from "../World/Wall";
import { ROOM_TITLE } from "../../constant/roomTitle";

export default class RoomOverview extends EventEmitter {
  private experience;
  private timeline?: gsap.core.Timeline;
  wall!: Wall;
  cube: THREE.Object3D<THREE.Event>;
  private isMoving: boolean;
  private currentRoomIndex: number;

  constructor() {
    super();
    this.experience = new Experience();
    this.timeline = GSAP.timeline();
    this.cube = this.experience.world.room.roomChildren["cube"];
    this.isMoving = false;
    this.currentRoomIndex = 0;
    this.setAssets();
    this.updateRoomChoiceIndex();
    this.attachClickEvent();
    this.attachRotateEvent();
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
        },
      });
      this.isMoving = true;
    }
  }

  attachRotateEvent() {
    let holdStartX: number;
    let isMoving: boolean;
    const eventRotateBlockOnHold = (event: MouseEvent) => {
      if (isMoving) return;
      const holdSwipeDistance = event.clientX - holdStartX;
      holdStartX = event.clientX;
      this.cube.rotation.y -= holdSwipeDistance / (window.innerWidth / 2);
    };

    document.addEventListener("mousedown", (event) => {
      const targetClass = (event.target as Element).className;
      if (
        targetClass.includes("room-choice") ||
        targetClass.includes("btn-show-room")
      )
        return;
      holdStartX = event.clientX;
      document.addEventListener("mousemove", eventRotateBlockOnHold);
    });

    document.addEventListener(
      "mouseup",
      ((event: MouseEvent) => {
        const targetClass = (event.target as Element).className;
        if (
          targetClass.includes("room-choice") ||
          targetClass.includes("btn-show-room")
        )
          return;
        document.removeEventListener(
          "mousemove",
          eventRotateBlockOnHold,
          false
        );
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
        onComplete: () => {
          document
            .querySelector(".room-choice-container")
            ?.classList.toggle("hidden", false);
          document
            .querySelector(".btn-show-room")
            ?.classList.toggle("hidden", false);
        },
      })
      .to(
        ".room-title .animatedis",
        {
          yPercent: -100,
          ease: "back.in(1.7)",
        },
        "title"
      );
  }

  attachClickEvent() {
    const rooms = document.querySelectorAll(".room-choice");
    rooms.forEach((room, index) => {
      room.addEventListener("click", () => {
        if (this.isMoving) return;
        const roomDirection = Math.sign(this.currentRoomIndex) || -1;
        const additionRoomIndex =
          (this.currentRoomIndex > 0
            ? Math.floor(this.currentRoomIndex - 1 / rooms.length)
            : Math.ceil(this.currentRoomIndex / rooms.length)) * rooms.length;
        // Room index should change before adding addition index (addition index to change cube smoothy)
        const roomIndexShouldChange =
          this.currentRoomIndex > 0 ? rooms.length - index : index;
        this.currentRoomIndex =
          additionRoomIndex + roomDirection * roomIndexShouldChange;
        this.updateRoomChoiceIndex();
        this.rotateCube();
      });
    });
    document.querySelector(".btn-show-room")?.addEventListener("click", () => {
      const roomIndex =
        this.currentRoomIndex % rooms.length > 0
          ? rooms.length - (this.currentRoomIndex % rooms.length)
          : Math.abs(this.currentRoomIndex % rooms.length);
      this.experience.world.emit("showroom", roomIndex);
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
    if (document.querySelector(".room-title")) {
      document.querySelector(".room-title")!.textContent =
        ROOM_TITLE[roomIndex].title;
    }
    const cubeMesh = this.cube.children[0] as THREE.Mesh;
    const cubeMeshSpecialFace = this.cube.children[1] as THREE.Mesh;
    const cubeMaterial = cubeMesh.material as THREE.MeshBasicMaterial;
    const cubeMaterialSpecialFace =
      cubeMeshSpecialFace.material as THREE.MeshBasicMaterial;
    if (cubeMaterial?.color && cubeMaterialSpecialFace?.color) {
      cubeMaterial.color = new THREE.Color(ROOM_TITLE[roomIndex].color);
      cubeMaterialSpecialFace.color = new THREE.Color(
        ROOM_TITLE[roomIndex].color
      );
    }
    const planeMaterial = this.wall.plane.material as THREE.MeshBasicMaterial;
    if (planeMaterial?.color) {
      planeMaterial.color = new THREE.Color(ROOM_TITLE[roomIndex].bannerColor);
    }
  }
}
