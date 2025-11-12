import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

// GUI
// older apps may use dat.gui but lil-gui is the newer version
// already installed as Thee.js add-on
const gui = new GUI();

// stats panel for frame rate and more (top-left, resize?)
var stats = new Stats();


// scene
const scene = new THREE.Scene();

// "three/addons/": "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js"

// the camera (and projection)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
document.body.appendChild(stats.dom); // stats panel

// add-ons ... mouse controls, model loader
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

// a cube (a mesh of geometry and material)
const cubeColor = {
            color: 0xffffff
         }
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: cubeColor.color } );
const cube = new THREE.Mesh( geometry, material );

// add to scene and GUI
scene.add( cube );
gui.add(material, 'wireframe');
gui.add(cube.position, 'x');
gui.add(cube.position, 'y');
gui.add(cube.position, 'z');
gui.addColor(cubeColor, 'color').onChange(() => {
            // callback
            material.color.set(cubeColor.color);
    })

// by default the object is at (0,0,0) same as camera, move the camera back a bit
camera.position.z = 5;

// the animation loop, updatee objects here and render the scene
function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
  stats.update();

}