// Define the binary tree as an array of nodes, where each node has a value and left and right children
const tree = [
    { value: 8, left: 1, right: 2 },
    { value: 3, left: 3, right: 4 },
    { value: 10, left: 5, right: 6 },
    { value: 1, left: 7, right: 0 },
    { value: 6, left: 0, right: 0 },
    { value: 14, left: 0, right: 0 },
    { value: 13, left: 0, right: 0 },
    { value: 4, left: 0, right: 0 }
  ];
  
  // Set up the Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 20, 50);
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Add interactivity
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 10;
  controls.maxDistance = 100;
  
  // Create a sphere to represent each node in the tree
  const spheres = tree.map(node => {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    sphere.position.set(node.x, node.y, node.z);
    sphere.nodeIndex = tree.indexOf(node); // Store the index of the node in the sphere object
    sphere.addEventListener('click', () => {
      highlightNode(sphere.nodeIndex);
    });
    scene.add(sphere);
    return sphere;
  });
  
  // Draw lines between the spheres to represent the connections between nodes
  tree.forEach((node, i) => {
    if (node.left) {
      const leftChild = tree[node.left];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([spheres[i].position, spheres[node.left].position]),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      scene.add(line);
    }
    if (node.right) {
      const rightChild = tree[node.right];
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([spheres[i].position, spheres[node.right].position]),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      scene.add(line);
    }
  });
  
  // Render the scene
  renderer.render(scene, camera);
  
  // Define a function to highlight a specific node
  function highlightNode(nodeIndex) {
    spheres.forEach(sphere => {
      sphere.material.color.set(0xffffff);
    });
    spheres[nodeIndex].material.color.set(0x00ff00);
  }
  
  // Define a function to animate the scene
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
  