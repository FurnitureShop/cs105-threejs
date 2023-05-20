import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
   experience: Experience;
   scene: THREE.Scene;
   geometry!: THREE.PlaneGeometry;
   material!: THREE.MeshStandardMaterial;
   plane!: THREE.Mesh<any, any>;

   constructor() {
      this.experience = new Experience();
      this.scene = this.experience.scene;

      this.setFloor()
   }

   setFloor() {
      this.geometry = new THREE.PlaneGeometry(100, 100);
      this.material = new THREE.MeshStandardMaterial({
         color: 0xffffff,
         side: THREE.BackSide
      })
      this.plane = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.plane)
      this.plane.rotation.x = Math.PI / 2
      this.plane.position.y = -0.3;
   }

   resize() { }

   update() {

   }
}