import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    experience: Experience;
    scene: THREE.Scene;
    resources: any;
    room: any;
    //for animations
    // mixer!: THREE.AnimationMixer;
    // swim!: THREE.AnimationAction;

    constructor(roomName: string) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.room = this.resources.items[roomName].scene
        // console.log(this.room)
        this.setModel();
        // this.setAnimation();
    }

    setModel() {
        this.room.children.forEach((child: THREE.Object3D) => {
            console.log(child)
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
            }
        })

        this.scene.add(this.room)
        this.room.scale.set(0.2, 0.2, 0.2)
        // this.room.rotation.y = Math.PI
    }

    // setAnimation() {
    //     console.log(this.room)
    //     this.mixer = new THREE.AnimationMixer(this.room);
    //     this.swim = this.mixer.clipAction(this.room.animations[0])
    //     this.swim.play()
    // }

    resize() { }

    update() {
        // this.mixer.update(this.experience.time.delta)
    }
}