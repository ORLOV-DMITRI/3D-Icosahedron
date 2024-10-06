import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    
    return renderer;
}

function createCameraAndScene() {
    const fov = 120;
    const aspect = width / height;
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new THREE.Scene();
    
    return {camera, scene};
}

function createCapsuleGeometry() {
    const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    const material = new THREE.MeshBasicMaterial( {color: 0xfffff, flatShading: true} );
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    })
    const wireCapsuleMesh = new THREE.Mesh(geometry, wireMaterial);
    const capsule = new THREE.Mesh( geometry, material );
    capsule.scale.setScalar(0.1)
    
    return {capsule, wireCapsuleMesh}
}

function createIcosahedron() {
    const geometry = new THREE.IcosahedronGeometry(1.0, 2);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true,
    });
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    })
    const wireMesh = new THREE.Mesh(geometry, wireMaterial);
    wireMesh.scale.setScalar(1.001)

    const icosahedronMesh = new THREE.Mesh(geometry, material);
    
    return {wireMesh, icosahedronMesh}
}

function createLight() {
    return new THREE.HemisphereLight(0x0099ff, 0xaa5500)
}

export function first() {
    const renderer = createRenderer();
    const {camera, scene} = createCameraAndScene();
    const {icosahedronMesh, wireMesh} = createIcosahedron();
    const hemiLight = createLight();
    
    
    icosahedronMesh.add(wireMesh)
    
    scene.add(icosahedronMesh);
    scene.add(hemiLight);
    
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    
    function animate(time = 0) {
        requestAnimationFrame(animate);
        icosahedronMesh.rotation.y = time * 0.0004;
        renderer.render(scene, camera);
        controls.update()
    }
    
    animate()
    
}
