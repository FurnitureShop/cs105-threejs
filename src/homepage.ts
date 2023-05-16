import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default function HomePage(scene: THREE.Scene, camera: THREE.Camera) {
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

document.addEventListener("mousemove",() => {})

document.addEventListener("mouseup", (event) => {
	swipeEndX = event.clientX;
	const swipeDistance = swipeEndX - swipeStartX;
	const screenWidth = window.innerWidth;
	const rotationDistance = Math.PI / 2; // 90 degrees in radians

	// Calculate remaining distance
	const remainingDistance = screenWidth - Math.abs(swipeDistance);

	// Determine rotation direction
	let rotationDirection: number;
	if (remainingDistance > rotationDistance) {
		rotationDirection = Math.sign(swipeDistance);
	} else {
		rotationDirection = -Math.sign(swipeDistance);
	}

	// Rotate block with animation
	const targetRotation = cube.rotation.y + rotationDirection * rotationDistance;

	const animate = () => {
		new TWEEN.Tween(cube.rotation)
			.to({ y: cube.rotation.y + (rotationDirection *  Math.PI / 2) }, 1000)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.start();
		// if (Math.abs(cube.rotation.y - targetRotation) > 0.01) {
		//   cube.rotation.y += (targetRotation - cube.rotation.y) * 0.1;
		//   requestAnimationFrame(animate);
		// }
	};
	animate();
});
}
