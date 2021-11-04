import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


//Scene
const scene = new THREE.Scene();


//Camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);


//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);


//Geometry
const geometry = new THREE.TorusGeometry(10,3,16,100);
//const material = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});
const material = new THREE.MeshStandardMaterial({color:0x6d2496});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);


//Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20,);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);
*/

//Orbit Control to move the scene with the mouse
const control = new OrbitControls(camera, renderer.domElement);


//to add random objects 
function addStars(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);

  //for randomly generating
  const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStars);      //Generates 200 stars


//Background
const backgroundImg = new THREE.TextureLoader().load('./wallpaper.jpg');
scene.background = backgroundImg;

//sphere
//const geometry = new THREE.SphereGeometry(3,32,32);
//const material = new THREE.MeshStandardMaterial({color:0xdb7da4});
const sphere = new THREE.Mesh(new THREE.SphereGeometry(3,32,32),new THREE.MeshStandardMaterial({color:0xdb7da4}));
scene.add(sphere);
sphere.position.z = 30;
sphere.position.setX(-10);


//To move camera while scroling
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;

  camera.position.z = t * -0.07;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  control.update();

  renderer.render(scene,camera);
}

animate();
