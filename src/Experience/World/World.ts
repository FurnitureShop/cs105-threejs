import * as THREE from "three";
import Experience from "../Experience";
import Room from "./Room";
import Environment from "./Environment";
import assets from "../Utils/assets";
import Controls from "./Controls";

export default class World {
   experience: Experience;
   room!: Room;
   sizes: any;
   scene: THREE.Scene;
   canvas: any;
   camera: any;
   resources: any;
   environment!: Environment;
   controls!: Controls;

   constructor() {
      this.experience = new Experience();
      this.sizes = this.experience.sizes;
      this.scene = this.experience.scene;
      this.canvas = this.experience.canvas;
      this.camera = this.experience.camera;
      this.resources = this.experience.resources;

      this.resources.on("ready", () => {
         this.environment = new Environment()
         this.room = new Room(assets[0].name);
         this.controls = new Controls();
         // console.log("room created")
      })
   }

   resize() {

   }

   update() {
      if (this.room) {
         this.room.update()
      }
      if (this.controls) {
         this.controls.update()
      }
   }
}