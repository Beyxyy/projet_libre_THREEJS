import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Ennemis
 */
//ajout d'un groupe pour les ennemis
const ennemis = new THREE.Group()
// body
const body = new THREE.Mesh(
    //ajout d'un cube pour le corps
    new THREE.BoxGeometry(1, 2, .7),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
body.position.y = 1
body.castShadow = true;
body.receiveShadow = true;

//head
const head = new THREE.Mesh(
    //ajout d'un cube pour la tête
    new THREE.BoxGeometry(.8, .8, .9),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
head.position.y = 1;
head.castShadow = true;
head.receiveShadow = true;
body.add(head);

//ajout d'un oeil 
const eye = new THREE.Mesh(
    new THREE.SphereGeometry(0.2),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
eye.position.x = 0
eye.position.y = .1 
eye.position.z = .4
eye.castShadow = true;
eye.receiveShadow = true;
head.add(eye);

head.rotation.x= -0.3


//left arms
const leftArm = new THREE.Mesh(
    //ajout d'un cube pour le bras gauche
    new THREE.BoxGeometry(.2, 1, .2),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
leftArm.position.x = -1
leftArm.position.y = 0.8
leftArm.position.z = 0.6
leftArm.castShadow = true;
leftArm.receiveShadow = true;
leftArm.rotation.x = 1
body.add(leftArm);  



//left arms
const rightArm = new THREE.Mesh(
    //ajout d'un cube pour le bras gauche
    new THREE.BoxGeometry(.2, 1, .2),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
rightArm.position.x = 1
rightArm.castShadow = true;
rightArm.receiveShadow = true;
rightArm.position.y = 0.8
rightArm.position.z = 0.6
rightArm.rotation.x = 1.2
body.add(rightArm);
ennemis.add(body);
ennemis.position.x = -3;
ennemis.rotation.y = -4.7;
scene.add(ennemis)

// Floor
const floor = new THREE.Group()

const laoderTerrain = new GLTFLoader();
laoderTerrain.load(
    'textures/floor/terrain.glb',
    (gltf) =>
    {
        
        const model = gltf.scene.children[0];
        model.scale.set(.4, .4, .4);
        model.position.y = -10.6;
        model.position.x = 0;
        model.position.z = 3.71;
        model.rotation.y =0;
        model.rotation.z =4.5;
        model.rotation.x =-1.575;
        model.receiveShadow = true;
        //add to GUI the position of the terrain
        gui.add(model.position, 'x').min(- 500).max(5).step(0.001)
        gui.add(model.position, 'y').min(-500).max(5).step(0.001)
        gui.add(model.position, 'z').min(- 500).max(5).step(0.001)
        model.traverse(function (node){
            if (node.isMesh) {
                node.receiveShadow = true
                node.castShadow = true
            }
        })
        floor.add(model);
    }
);



// add grass with the model grass.glb
const laoderGrass_1 = new GLTFLoader();
laoderGrass_1.load(
    "textures/floor/grass3d.glb",
    (gltf)=>
    {
        const model = gltf.scene.children[0];
        model.scale.set(1.3,1.3,1.3);
        model.position.y = -0.2;
        model.position.x = -7;
        model.position.z = -3;
         model.traverse(function (node){
            if (node.isMesh){
                node.castShadow = true;
                node.receiveShadow = true;
            }
    })
        gui.add(model.position, 'x').min(- 500).max(5).step(0.001)
        gui.add(model.position, 'y').min(- 500).max(5).step(0.001)
        gui.add(model.position, 'z').min(- 500).max(5).step(0.001)
        floor.add(model);
    }
)
const laoderGrass_2 = new GLTFLoader();
laoderGrass_2.load(
    "textures/floor/grass3d.glb",
    (gltf)=>
    {
        const model = gltf.scene.children[0];
        model.scale.set(1,1,1);
        model.position.y = -0.2;
        model.position.x = -2;
        model.position.z = 4;
         model.traverse(function (node){
            if (node.isMesh){
                node.castShadow = true;
                node.receiveShadow = true;
            }
    })
        gui.add(model.position, 'x').min(- 500).max(5).step(0.001)
        gui.add(model.position, 'y').min(- 500).max(5).step(0.001)
        gui.add(model.position, 'z').min(- 500).max(5).step(0.001)
        floor.add(model);
    }
)
const laoderGrass_3 = new GLTFLoader();
laoderGrass_3.load(
    "textures/floor/grass3d.glb",
    (gltf)=>
    {
        const model = gltf.scene.children[0];
        model.scale.set(.8,.8,.8);
        model.position.y = -0.2;
        model.position.x = -7;
        model.position.z = 6;
        model.traverse(function (node){
            if (node.isMesh){
                node.castShadow = true;
                node.receiveShadow = true;
            }
    })
        floor.add(model);
    }
)




//ajout de plusieurs pierres un peu partout à partir d'un model glb
const loaderStone = new GLTFLoader();
loaderStone.load(
    'textures/floor/desert_rocks.glb',
    (gltf) =>
    {
        const model = gltf.scene.children[0];
        model.scale.set(2, 2, 2);
        model.position.y = 0;
        model.position.x = -10;
        model.position.z = 1;
        model.rotation.y =10;
        model.rotation.z =5;
        model.rotation.x =-5.5;
        model.traverse(function (node){
            if (node.isMesh) {
                node.castShadow = true
            }
        })
        floor.add(model);
    }
);

function initLighting(model) {
    model.traverse((child) => {
      if (child.isMesh) {
        // Crée un matériau MeshStandardMaterial
        const material = new THREE.MeshPhongMaterial({
          map: child.material.map, // Utilise la texture existante
          emissive: new THREE.Color('ff0000'), // Couleur de l'émission
          emissiveIntensity: 1, // Ajuste l'intensité selon tes préférences
          transparent: true, // Active la transparence
          opacity: 1, // Ajuste l'opacité selon tes préférences
        });
  
        child.material = material;
      }
    });
  }
  





scene.add(floor)


//chargement de la texture de la tour
const texture = textureLoader.load('/textures/tower/brique.jpg');
texture.repeat.x = 1;
texture.repeat.y = 1;

const christal = textureLoader.load('/textures/tower/christal.jpg');



//AJout de ma tour de tower defense
const tower = new THREE.Group()
//base
const base = new THREE.Mesh(
    new THREE.BoxGeometry(4,0.7, 4),
    new THREE.MeshStandardMaterial(
        //ajout de la texture
        { map: texture }

    )
)
base.position.y =0
tower.add(base)
//body
const bodyTower = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({map : texture})
)
bodyTower.position.y = 1.5
tower.add(bodyTower)

//chargement du model 3D
const loader = new GLTFLoader();
loader.load(
    'textures/tower/model/free__magic_gemme.glb',
    (gltf) =>
    {
        const model = gltf.scene.children[0];
        model.scale.set(80,80,80);
        model.position.y = 5;
        model.position.x = 0;
        model.position.z = 0;
        model.rotation.y = 0;
        model.castShadow = true;

        tower.add(model);
    }
);



const moonLight = new THREE.PointLight('#08F', 0.5)
moonLight.position.x = 30
moonLight.position.y = -8.5
moonLight.position.z = 4
scene.add(moonLight)


const pointLight = new THREE.PointLight('#08F', 700)
pointLight.position.x = 3
pointLight.position.y = 8.5
pointLight.position.z = 0
pointLight.castShadow = true;


scene.add(pointLight);



tower.position.y = 0;
tower.position.x = 3;
tower.position.z = 0;

scene.add(tower)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 90)
camera.position.x = -10
camera.position.y = 10
camera.position.z = 10
scene.add(camera)
const helper = new THREE.CameraHelper( camera );

scene.add( helper );

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
scene.receiveShadow = true;
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update the color of the light of the gemme in the blue tones 
    pointLight.color.setHSL(elapsedTime * 0.1, 0.5, 0.5);
    
   

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()