import * as THREE from "three";
import Experience from "../Experience";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import GSAP from "gsap";

export default class Controls {
   experience: Experience;
   scene: THREE.Scene;
   resources: any;
   time: any;
   timeline!: gsap.core.Timeline;
   room: any;

   constructor() {
      this.experience = new Experience();
      this.scene = this.experience.scene;
      this.resources = this.experience.resources;
      this.time = this.experience.time;
      this.room = this.experience.world.room.room;

      GSAP.registerPlugin(ScrollTrigger)
      this.setPath();
   }

   setPath() {
      // console.log(this.room)
      // let firstSectionMargin = document.querySelector("div[first-section-margin]")
      // console.log(firstSectionMargin)
      this.timeline = new GSAP.timeline();
      this.timeline.to(this.room.position, {
         x: 0.8,
         scrollTrigger: {
            trigger: "div[first-section-margin]",
            // markers: true,
            // start: "top top",
            // end: "bottom bottom",
            scrub: 0.5
         }
      })
   }

   resize() { }

   update() {

   }
}