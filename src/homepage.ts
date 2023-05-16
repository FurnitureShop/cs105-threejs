import * as THREE from "three";

export default function HomePage(scene: THREE.Scene, camera: THREE.Camera) {
	const geomestry = new THREE.BoxGeometry(1, 1, 1);
	const material = [
		new THREE.MeshBasicMaterial({ color: '#ee0000', }),
		new THREE.MeshBasicMaterial({ color: '#00ee00' }),
		new THREE.MeshBasicMaterial({ color: '#0000ee' }),
		new THREE.MeshBasicMaterial({ color: '#e00ee0' }),
		new THREE.MeshBasicMaterial({ color: '#115533' }),
		new THREE.MeshBasicMaterial({ color: '#779900' })
	]
	const cube = new THREE.Mesh(geomestry, material);
	scene.add(cube);

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	function onDocumentMouseMove(event: MouseEvent) {
		event.preventDefault();

		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;		
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	function onDocumentMouseDown(event: MouseEvent) {
		event.preventDefault();

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(scene.children);

		if(intersects.length>0) {
			const distanceSwiped = 0;
			const rotationAmount = 10;
			cube.rotation.y += rotationAmount;
		}
	}

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mousedown', onDocumentMouseDown, false);
}
