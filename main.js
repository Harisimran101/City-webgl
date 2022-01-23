import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoomEnvironment  } from 'https://threejs.org/examples/jsm/environments/RoomEnvironment.js';
import { FirstPersonControls } from 'https://threejs.org/examples/jsm/controls/FirstPersonControls.js';

console.log(FirstPersonControls);

const webgl = document.querySelector('#webgl');
const progress = document.querySelector('#progress');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;

const clock = new THREE.Clock();


//-- Scene
    		const scene = new THREE.Scene();

//-- Camera			
            const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
            scene.add( camera );
			camera.position.set(5.3,2.5,3.9); 


//--Renderer	
			const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#webgl')});
			renderer.setSize( window.innerWidth,window.innerHeight);
			renderer.setPixelRatio(window.devicePixelRatio /1.3);
			renderer.outputEncoding = THREE.sRGBEncoding;

			renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;			

//-- Scene Background		

const pmremGenerator = new THREE.PMREMGenerator( renderer );

scene.background = new THREE.Color( 0xeeeeee );



//-- Screen Resize
window.addEventListener('resize', () =>{
	onWindowResize()
});
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
	
				renderer.setSize( window.innerWidth,window.innerHeight);
	
			};

//-- Orbit-Controls			
			// const controls = new THREE.OrbitControls( camera, renderer.domElement );
		

			let controls = new FirstPersonControls( camera, renderer.domElement );
			controls.movementSpeed = 10;
			controls.lookSpeed = 0.1;

//-- Materials	

//-- Lights 
const light = new THREE.HemisphereLight( '#F7F7F7', '#F7F7F7', 1.5);
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
scene.add( directionalLight );
directionalLight.position.set(0,4,0);

//-- Objects 
let percentage;

			let loader = new THREE.GLTFLoader();
            let gallery;
 
			loader.load('model/City.gltf', function(gltf){
				
	            gallery = gltf.scene;
	
	
                scene.add(gallery);			  
        
			});
		
            function render() {
                requestAnimationFrame(render);
				controls.update( clock.getDelta() );
                renderer.render(scene, camera);
                }
render();      