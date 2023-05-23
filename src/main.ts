import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import Page from "./Page/Page";
import "./style.css";
import Experience from "./Experience/Experience";

// const app = document.querySelector<HTMLDivElement>("#app");
// app!.innerHTML = `
//   <div>
//   </div>
// `;
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// // app?.appendChild(renderer.domElement);

// // HomePage(scene, camera)

// function animate() {
// 	requestAnimationFrame(animate);
// 	TWEEN.update();
// 	renderer.render(scene, camera);
// }

// console.log(document)

// animate();


const experience = new Experience(document.querySelector(".experience-canvas"))
// const page = new Page(document.querySelector(".room-canvas") || undefined);