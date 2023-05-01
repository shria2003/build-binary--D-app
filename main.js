// Set up the Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('tree-container').appendChild(renderer.domElement);

// Create a sphere to represent the root node of the binary tree
var rootSphere = new THREE.Mesh(
	new THREE.SphereGeometry(1, 16, 16),
	new THREE.MeshBasicMaterial({ color: 0xffffff })
);
rootSphere.position.set(0, 0, -10);
scene.add(rootSphere);

// Create a line to represent the connection from the root node to its left child
var leftLine = new THREE.Line(
	new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -10), new THREE.Vector3(-2, -2, -15)]),
	new THREE.LineBasicMaterial({ color: 0xffffff })
);
scene.add(leftLine);

// Create a sphere to represent the left child node of the binary tree
var leftSphere = new THREE.Mesh(
	new THREE.SphereGeometry(1, 16, 16),
	new THREE.MeshBasicMaterial({ color: 0xffffff })
);
leftSphere.position.set(-2, -2, -15);
scene.add(leftSphere);

// Create a line to represent the connection from the root node to its right child
var rightLine = new THREE.Line(
	new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -10), new THREE.Vector3(2, -2, -15)]),
	new THREE.LineBasicMaterial({ color: 0xffffff })
);
scene.add(rightLine);

// Create a sphere to represent the right child node of the binary tree
var rightSphere = new THREE.Mesh(
	new THREE.SphereGeometry(1, 16, 16),
	new THREE.MeshBasic.Material({ color: 0xffffff })
);
rightSphere.position.set(2, -2, -15);
scene.add(rightSphere);

// Set the camera position and look at the root node
camera.position.set(0, 0, 20);
camera.lookAt(rootSphere.position);

// Render the scene
renderer.render(scene, camera);
