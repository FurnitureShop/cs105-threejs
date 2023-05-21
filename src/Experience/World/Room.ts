import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
   experience: Experience;
   scene: THREE.Scene;
   resources: any;
   room: any;
   lerp: any;
   rotation: any;
   //for animations
   // mixer!: THREE.AnimationMixer;
   // swim!: THREE.AnimationAction;

   constructor(roomName: string) {
      this.experience = new Experience();
      this.scene = this.experience.scene;
      this.resources = this.experience.resources;
      this.room = this.resources.items[roomName].scene
      // console.log(this.room)
      //TODO: need to understand the moving camera along curves
      this.lerp = {
         current: 0,
         target: 0,
         ease: 0.1
      }

      this.setModel();
      this.onMouseMove()
      // this.setAnimation();
   }

   setModel() {
      console.log(this.room)
      this.room.children.forEach((child: THREE.Object3D) => {
         // console.log(child)
         child.castShadow = true;
         child.receiveShadow = true;

         //Threejs automatically group mesh together
         //So need to check if child is a group to add castShadow
         if (child instanceof THREE.Group) {
            child.children.forEach((groupChild) => {
               groupChild.castShadow = true;
               groupChild.receiveShadow = true;
            })
         }

         //only specific for room_01
         if (child.name === "Aquarium") {
            // console.log(child);
            child.children[0].material = new THREE.MeshPhysicalMaterial();
            child.children[0].material.roughness = 0;
            child.children[0].material.color.set(0x549dd2);
            child.children[0].material.ior = 3;
            child.children[0].material.transmission = 1;
            child.children[0].material.opacity = 1;
            child.children[0].material.depthWrite = false;
            child.children[0].material.depthTest = false;

            this.setupAreaLight(child)
         }
      })

      this.scene.add(this.room)
      this.room.scale.set(0.15, 0.15, 0.15)
      // this.room.rotation.y = Math.PI
   }

   setupAreaLight(object: THREE.Object3D) {
      //set light for the aquarium
      const width = 1;
      const height = 1;
      const intensity = 3;
      const rectLight = new THREE.RectAreaLight(
         0xffffff,
         intensity,
         width,
         height
      );
      rectLight.position.set(1, 5, -1);
      rectLight.rotation.x = -Math.PI / 2;
      rectLight.rotation.z = Math.PI / 4;
      object.add(rectLight);
   }

   onMouseMove() {
      window.addEventListener("mousemove", (event) => {
         // console.log(event)
         const width = window.innerWidth
         this.rotation = ((event.clientX - width / 2) * 2) / width;
         this.lerp.target = this.rotation * 0.15
      })
   }

   // setAnimation() {
   //     console.log(this.room)
   //     this.mixer = new THREE.AnimationMixer(this.room);
   //     this.swim = this.mixer.clipAction(this.room.animations[0])
   //     this.swim.play()
   // }

   resize() { }

   update() {
      this.lerp.current = GSAP.utils.interpolate(
         this.lerp.current,
         this.lerp.target,
         this.lerp.ease
      )
      this.room.rotation.y = this.lerp.current
      // this.mixer.update(this.experience.time.delta)
   }
}