import * as THREE from "three";
import Experience from "./Experience";
//@ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class Camera {
   experience: Experience;
   sizes: any;
   scene: any;
   canvas: any;

   perspectiveCamera!: THREE.PerspectiveCamera;
   orthographicCamera!: THREE.OrthographicCamera;
   controls: any;

   // helper!: THREE.CameraHelper;

   constructor() {
      this.experience = new Experience();
      this.sizes = this.experience.sizes;
      this.scene = this.experience.scene;
      this.canvas = this.experience.canvas;
      // console.log(this.experience, this.sizes, this.scene, this.canvas)
      this.createPerspectiveCamera();
      this.createOrthographicCamera();
      this.setOrbitControls();
   }
   //
   createPerspectiveCamera() {
      this.perspectiveCamera = new THREE.PerspectiveCamera(
         35,
         this.sizes.aspect,
         0.1,
         1000
      )
      this.perspectiveCamera.position.x = 29
      this.perspectiveCamera.position.y = 14
      this.perspectiveCamera.position.z = 12
      this.scene.add(this.perspectiveCamera)
   }

   createOrthographicCamera() {
      this.orthographicCamera = new THREE.OrthographicCamera(
         (-this.sizes.aspect * this.sizes.frostum) / 2,
         (this.sizes.aspect * this.sizes.frostum) / 2,
         this.sizes.frostum / 2,
         -this.sizes.frostum / 2,
         -50,
         50
      )
      // this.orthographicCamera.position.x
      this.orthographicCamera.position.y = 4
      this.orthographicCamera.position.z = 5
      this.orthographicCamera.rotation.x = -Math.PI / 6;
      this.scene.add(this.orthographicCamera)

      // this.helper = new THREE.CameraHelper(this.orthographicCamera);
      // this.scene.add(this.helper);

      // const gridHelper = new THREE.GridHelper(20, 20);
      // this.scene.add(gridHelper);

      // const axesHelper = new THREE.AxesHelper(5);
      // this.scene.add(axesHelper);
   }

   setOrbitControls() {
      this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
      this.controls.enableDamping = true;
      this.controls.enableZoom = true;
   }

   resize() {
      //Update Perspective Camera on resize
      this.perspectiveCamera.aspect = this.sizes.aspect
      this.perspectiveCamera.updateProjectionMatrix();

      //Update Orthographic Camera on resize
      this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frostum) / 2
      this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frostum) / 2
      this.orthographicCamera.top = this.sizes.frostum / 2
      this.orthographicCamera.bottom = -this.sizes.frostum / 2
      this.orthographicCamera.updateProjectionMatrix()
   }

   update() {
      // console.log(this.perspectiveCamera.position);
      this.controls.update();

      // this.helper.matrixWorldNeedsUpdate = true;
      // this.helper.update();
      // this.helper.position.copy(this.orthographicCamera.position);
      // this.helper.rotation.copy(this.orthographicCamera.rotation);
   }
}