<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container;
	let camera, scene, renderer;
	let geometry, material, mesh;

	onMount(() => {
		// Create the scene
		scene = new THREE.Scene();

		// Create the camera
		camera = new THREE.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.z = 5;

		// Create the object
		geometry = new THREE.BoxGeometry(1, 1, 1);
		material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Animation loop
		const animate = function () {
			requestAnimationFrame(animate);
			mesh.rotation.x += 0.01;
			mesh.rotation.y += 0.02;
			renderer.render(scene, camera);
		};

		animate();

		return () => {
			// Clean up on component destruction
			renderer.dispose();
			scene.dispose();
			geometry.dispose();
			material.dispose();
		};
	});

	function resizeRenderer() {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	window.addEventListener('resize', () => {
		if (resizeRenderer()) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}
	});
</script>

<div bind:this={container} class="w-full h-full" />
