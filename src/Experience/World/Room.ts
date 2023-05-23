import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import Resources from "../Utils/Resources";
import { HEIGHT, INTENSITY, WIDTH } from "../../constant/rectLight";

type LerpType = {
   current: number;
   target: number;
   ease: number;
};

export default class Room {
   experience: Experience;
   scene: THREE.Scene;
   resources: Resources;
   room: GLTF;
   lerp: LerpType;
   rotation: number;
   rectLight!: THREE.RectAreaLight;
   actualRoom: THREE.Group;
   roomChildren: { [key in string]: THREE.Object3D<THREE.Event> };
   //for animations
   // mixer!: THREE.AnimationMixer;
   // swim!: THREE.AnimationAction;

   constructor(roomName: string) {
      this.experience = new Experience();
      this.scene = this.experience.scene;
      this.resources = this.experience.resources;
      console.log(roomName)
      this.room = this.resources.items[roomName];
      this.actualRoom = this.room.scene;
      this.roomChildren = {};
      this.rotation = 0;
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
      this.actualRoom.children.forEach((child: THREE.Object3D<THREE.Event>) => {
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
            const aquarium = child.children[0] as THREE.Mesh;
            aquarium.material = new THREE.MeshPhysicalMaterial();
            const aquariumMaterial = aquarium.material as THREE.MeshPhysicalMaterial
            aquariumMaterial.roughness = 0;
            aquariumMaterial.color.set(0x549dd2);
            aquariumMaterial.ior = 3;
            aquariumMaterial.transmission = 1;
            aquariumMaterial.opacity = 1;
            aquariumMaterial.depthWrite = false;
            aquariumMaterial.depthTest = false;

            this.setupAreaLight(child)
         }

                  // child.scale.set(0, 0, 0);
                  if (child.name === "Cube") {
                     child.position.set(0, -1.5, 0);
                     child.rotation.y = Math.PI / 4;
                  }

         this.roomChildren[child.name.toLowerCase()] = child;
      })


      // const rectLightHelper = new RectAreaLightHelper(rectLight);
      // rectLight.add(rectLightHelper);
      // console.log(this.room);

      this.scene.add(this.actualRoom);
      this.actualRoom.scale.set(0.11, 0.11, 0.11);

      this.scene.add(this.actualRoom);
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
      this.roomChildren["rectLight"] = rectLight;
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
      this.actualRoom.rotation.y = this.lerp.current
      // this.mixer.update(this.experience.time.delta)
   }
}