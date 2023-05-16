import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import "./style.css";
import HomePage from "./homepage";

const app = document.querySelector<HTMLDivElement>("#app");
app!.innerHTML = `
  <div>
  </div>
`;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
app?.appendChild(renderer.domElement);
HomePage(scene, camera);
// Create a 3D block


function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	renderer.render(scene, camera);
}

animate();
