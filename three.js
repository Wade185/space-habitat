// ========== 3D Visualization ==========
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500);
document.getElementById("planetCanvas").appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Planet sphere with texture
const textureLoader = new THREE.TextureLoader();
const planetTexture = textureLoader.load(planet.image);
const planetGeometry = new THREE.SphereGeometry(3, 64, 64);
const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
scene.add(planetMesh);

// Add light
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x333333));

// Add glowing habitat domes
function addHabitat(lat, lon) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(3 * Math.sin(phi) * Math.cos(theta));
  const y = 3 * Math.cos(phi);
  const z = 3 * Math.sin(phi) * Math.sin(theta);

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.7 })
  );
  dome.position.set(x, y, z);
  scene.add(dome);
}

// Example domes (you can later make these dynamic from requirements)
addHabitat(10, 20);
addHabitat(-30, 120);

// Camera position
camera.position.z = 7;

// Animation
function animate() {
  requestAnimationFrame(animate);
  planetMesh.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, 500);
  camera.aspect = window.innerWidth / 500;
  camera.updateProjectionMatrix();
});
