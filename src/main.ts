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

// Create a 3D block
const geometry = new THREE.BoxGeometry();
const material = [
	new THREE.MeshBasicMaterial({ color: "#ee0000" }),
	new THREE.MeshBasicMaterial({ color: "#00ee00" }),
	new THREE.MeshBasicMaterial({ color: "#0000ee" }),
	new THREE.MeshBasicMaterial({ color: "#e00ee0" }),
	new THREE.MeshBasicMaterial({ color: "#115533" }),
	new THREE.MeshBasicMaterial({ color: "#779900" }),
];
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Detect swipe event
let swipeStartX: number;
let swipeEndX: number;
document.addEventListener("mousedown", (event) => {
	swipeStartX = event.clientX;
});
document.addEventListener("mouseup", (event) => {
	swipeEndX = event.clientX;
	const swipeDistance = swipeEndX - swipeStartX;
	const screenWidth = window.innerWidth;
	const rotationDistance = Math.PI / 2; // 90 degrees in radians

	// Calculate remaining distance
	const remainingDistance = screenWidth - Math.abs(swipeDistance);

	// Determine rotation direction
	let rotationDirection;
	if (remainingDistance > rotationDistance) {
		rotationDirection = Math.sign(swipeDistance);
	} else {
		rotationDirection = -Math.sign(swipeDistance);
	}

	// Rotate block with animation
	const targetRotation = cube.rotation.y + rotationDirection * rotationDistance;

	const animate = () => {
		new TWEEN.Tween(cube.rotation)
			.to({ y: Math.PI / 2 }, 2000)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();
		// if (Math.abs(cube.rotation.y - targetRotation) > 0.01) {
		//   cube.rotation.y += (targetRotation - cube.rotation.y) * 0.1;
		//   requestAnimationFrame(animate);
		// }
	};
	animate();
});

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	renderer.render(scene, camera);
}

animate();
