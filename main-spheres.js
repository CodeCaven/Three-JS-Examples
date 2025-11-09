import * as THREE from 'three';

let container, camera, scene, renderer, effect;

const spheres = [];

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove );

init();

function init() {

    // create container
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // set the camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 3;

    // paths to skybox images
    const path = 'public/cubemaps/street2/';
    const format = '.PNG';
    const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    // load the skybox images as a cube texture
    const textureCube = new THREE.CubeTextureLoader().load( urls );

    // scene with skybox background
    scene = new THREE.Scene();

    var backgroundColor = new THREE.Color(0x000000); // Black
    //scene.background = backgroundColor;
    scene.background = textureCube;

    // geometry and material for spheres
    const geometry = new THREE.SphereGeometry( 0.1, 32, 16 ); // sphere
    //let cube_size = Math.random()*0.2;
    //const geometry = new THREE.BoxGeometry( cube_size, cube_size, cube_size ); // cube
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

    for ( let i = 0; i < 400; i ++ ) {

        // create a sphere
        const mesh = new THREE.Mesh( geometry, material );

        // position of sphere
        mesh.position.x = Math.random() * 10 - 5;
        mesh.position.y = Math.random() * 10 - 5;
        mesh.position.z = Math.random() * 10 - 5;

        // size of sphere
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

        // add to scene
        scene.add( mesh );

        // store for animate loop
        spheres.push( mesh );

    }

    // the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setAnimationLoop( animate );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // resize callback
    window.addEventListener( 'resize', onWindowResize );

}

/* CALLBACKS */
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 100;
    mouseY = ( event.clientY - windowHalfY ) / 100;
}

// ANIMATION LOOP
function animate() {
    render();
}

function render() {

    const timer = 0.0001 * Date.now();
    const interval = 0.0008;

    camera.position.x +=  interval; //( mouseX - camera.position.x ) * .05;
    camera.position.y += interval; // ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    for ( let i = 0, il = spheres.length; i < il; i ++ ) {

        const sphere = spheres[ i ];

        sphere.position.x = 5 * Math.cos( timer + i );
        sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

        //sphere.rotation.x += 0.1;
        //sphere.rotation.y += 0.1;

    }

    renderer.render( scene, camera );

}