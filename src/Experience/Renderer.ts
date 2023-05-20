import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
   experience: Experience;
   sizes: any;
   scene: any;
   canvas: any;
   camera: any;
   renderer!: THREE.WebGLRenderer;

   constructor() {
      this.experience = new Experience();
      this.sizes = this.experience.sizes;
      this.scene = this.experience.scene;
      this.canvas = this.experience.canvas;
      this.camera = this.experience.camera;
      // console.log(this.camera, this.camera.perspectiveCamera)
      this.setRenderer();
   }

   setRenderer() {
      this.renderer = new THREE.WebGLRenderer({
         canvas: this.canvas,
         antialias: true
      })

      // this.renderer.physicallyCorrectLights = true;
      // this.renderer.useLegacyLights = false
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.CineonToneMapping;
      this.renderer.toneMappingExposure = 1.75;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(this.sizes.pixelRatio);
   }

   resize() {
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(this.sizes.pixelRatio);
   }

   update() {
      // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
      this.renderer.render(this.scene, this.camera.orthographicCamera);
      // Second Screen
      // this.renderer.setScissorTest(true);
      // this.renderer.setViewport(
      //    this.sizes.width - this.sizes.width / 3,
      //    this.sizes.height - this.sizes.height / 3,
      //    this.sizes.width / 3,
      //    this.sizes.height / 3
      // );

      // this.renderer.setScissor(
      //    this.sizes.width - this.sizes.width / 3,
      //    this.sizes.height - this.sizes.height / 3,
      //    this.sizes.width / 3,
      //    this.sizes.height / 3
      // );

      // this.renderer.render(this.scene, this.camera.perspectiveCamera);

      // this.renderer.setScissorTest(false);
   }
}