import { RGBELoader } from 'https://threejs.org/examples/jsm/loaders/RGBELoader.js';
import { RoomEnvironment  } from 'https://threejs.org/examples/jsm/environments/RoomEnvironment.js';

const webgl = document.querySelector('#webgl');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;


//-- Scene
    		const scene = new THREE.Scene();

//-- Camera			
            const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );
            scene.add( camera );
			camera.position.set(5.3,2.5,3.9); 


//--Renderer	
			const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#webgl')});
			renderer.setSize( window.innerWidth,window.innerHeight);
			renderer.setPixelRatio(window.devicePixelRatio /1.5);
			renderer.outputEncoding = THREE.sRGBEncoding;

			renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;			

//-- Scene Background		

const pmremGenerator = new THREE.PMREMGenerator( renderer );

scene.background = new THREE.Color( 0xeeeeee );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;


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
			const controls = new THREE.OrbitControls( camera, renderer.domElement );
		

	
//-- Materials	

//-- Lights 


//-- Objects 

			let loader = new THREE.GLTFLoader();
            let gallery;
 
			loader.load('model/City.gltf', function(gltf){
				
	            gallery = gltf.scene;
	
	
                scene.add(gallery);			  
        
			});

	
		
            function render() {
                requestAnimationFrame(render);

				  
                renderer.render(scene, camera);
                }
render();      