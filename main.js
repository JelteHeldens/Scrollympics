import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background = new THREE.Color( 0x1A0033);
// Standaard three.js camara scroll en move controlls
//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();


//Licht & schaduw
const al = new THREE.AmbientLight(0xffffff, 1);
scene.add(al);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const dirLight = new THREE.DirectionalLight( 0xffffff, 1);
dirLight.position.set( 0, 40, 0 ); //default; light shining from top
dirLight.castShadow = true; // default false
scene.add( dirLight );

//Shadowmap Settings
dirLight.shadow.mapSize.width = 1024; // default
dirLight.shadow.mapSize.height = 1024; // default
dirLight.shadow.bias = -0.001; // default
dirLight.shadow.camera.near = 0.5; // default
dirLight.shadow.camera.far = 500; // default
dirLight.shadow.camera.top = -50 // default
dirLight.shadow.camera.right = 100 // default
dirLight.shadow.camera.left = -100 // default
dirLight.shadow.camera.bottom = 50 // default

//Grondvlak
const geometryGR = new THREE.PlaneGeometry( 1010, 100 );
const materialGR = new THREE.MeshStandardMaterial( {color: 0xd05942, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryGR, materialGR );
plane.receiveShadow = true;
scene.add( plane );
//Kubus.
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshStandardMaterial( { color: 0x1d551c } );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
scene.add( cube );


//Wireframe van de Kubus.
const geometry2 = new THREE.BoxGeometry( 10, 10, 10 );
const wireframe = new THREE.WireframeGeometry( geometry2 );
const wirefr = new THREE.LineSegments( wireframe );
wirefr.material.depthTest = false;
wirefr.material.opacity = 0.25;
wirefr.material.transparent = false;
scene.add( wirefr );

//Volglijn van de sinusoïdale beweging van de kubus en wireframe.
const material2 = new THREE.LineBasicMaterial({color: 0x0000ff});
const points = [];
points.push( new THREE.Vector3(0, -10, 0) );
points.push( new THREE.Vector3(0, 10, 0) );
const geometry3 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry3, material2 );
scene.add( line );


var i = 0;
var scrollie = 0;
camera.position.z = 40;
camera.position.y = 40;
camera.rotation.x = -1;

plane.rotation.x = Math.PI/2;
plane.position.x = 490;
plane.position.y = -15;
var startTijd = 0;
var tijd = 0;

document.addEventListener('keydown', function(event) {
	switch(event.key){
		case "Escape":
			alert('Er is geen ontsnapping mogelijk, moehahahaaaa!');
			break;
		case "b":
			scene.background = new THREE.Color( 0x1A0033);
			break;
		case "g":
			scene.background = new THREE.Color( 0x00331A);
			break;
	}
});

document.addEventListener( 'mousewheel', (event) => {
    //scrollie += Math.abs(event.deltaY/500);
	if(startTijd == 0){
		startTijd = 1;
	}
	scrollie += 0.1*(event.deltaY/500);
});

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {
	requestAnimationFrame( animate );
	
	cube.rotation.y += 0.005;
	var sinus = Math.sin(i)*10;
	switch(true){
		case (cube.position.x >= 1000):
			alert('FINNISH! in ' + tijd.toFixed(3) + ' seconden!' );
		case (cube.position.x <= -0.1):
			cube.position.x = 0;
			wirefr.position.x = 0;
			scrollie = 0;
			startTijd = 0;
			tijd = 0;
			break;
		default:
			cube.position.x += scrollie;
			wirefr.position.x += scrollie;
			break;						
	}
	//dirLight.position.x = cube.position.x;
	//dirLight.shadow.camera.left = cube.position.x -50;
	cube.position.y = sinus;
	wirefr.rotation.y += 0.005;
	wirefr.position.y = sinus;
	i += 0.01;
	if (startTijd == 1){tijd += 1/150;}	
	//console.log(tijd);
	//console.log(dirLight.position.x);

	camera.position.x = cube.position.x;
	
	renderer.render( scene, camera );
}

animate();