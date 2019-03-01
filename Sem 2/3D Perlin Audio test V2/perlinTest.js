myArr = [];

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;
camera.position.y = 10;
camera.rotation.x = -0.2;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create an Audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
// audioLoader.load( 'Aphex Twin - 54 Cymru Beats.mp3', function( buffer ) {
audioLoader.load( 'Kalimba.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(0.5);

	var playPauseButton = document.getElementById( 'play_pause_button' );

	playPauseButton.onclick = toggleSong();

});

function toggleSong(){      //function to play and pause the audio file ~ This connects to the button
    if (sound.play()==true) {
        sound.pause();       //pausing the audio file
				console.log("PAUSED");
    } else {
        sound.play();        //continuing to run the audio file
				console.log("PLAYING");
    }
}

// create an AudioAnalyser, passing in the sound and desired fftSize
var analyser = new THREE.AudioAnalyser( sound, 2048 );


class Entity{
  constructor(){

  }
  Update(){

  }
}

// class Sphere extends Entity{
//   constructor(){
//     super();
//
//     this.sphere_geometry = new THREE.SphereGeometry(20, 128, 128);
//     this.material = new THREE.MeshNormalMaterial();
//     this.sphere = new THREE.Mesh(this.sphere_geometry, this.material);
//     scene.add(this.mesh);
//
//   }
//
//   Update(){
//     super.Update();
//
//     // for (var i = 0; i < this.sphere.geometry.vertices.length; i++) {
//     //   var p = this.sphere.sphere[i];
//     // }
//     // this.sphere.geometry.verticesNeedUpdate = true; //must be set or vertices will not update
//
//   }
//
// }
//
// var sun = new Sphere();
//
// console.log(sun.geometry.vertices.length);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //default

var light1 = new THREE.DirectionalLight(0xffffff, 0.8); //creates white directional light
light1.position.set(0, 30, 20);
light1.castShadow = true;

light1.shadow.camera.top = 30;
light1.shadow.camera.bottom = -30;
light1.shadow.camera.left = -30;
light1.shadow.camera.right = 30;

light1.shadow.mapSize.width = 512; //default values!!!
light1.shadow.mapSize.height = 512; //
light1.shadow.camera.near = 0.5;
light1.shadow.camera.far = 500;

var ambLight = new THREE.AmbientLight( 0x002244 );

var planeGeometry = new THREE.PlaneGeometry (200, 200, 10, 10);
var planeMaterial = new THREE.MeshStandardMaterial({color: 0xD08CFF, opacity: 1, transparent: true});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.position.x=0;
plane.position.y= -35;
plane.position.z=0;
plane.rotation.x = -1.570;



//TEST BOX - REMEMBER TO ADD TO SCENE
var box_geom = new THREE.BoxGeometry(10,10,10);
var boxMaterial = new THREE.MeshStandardMaterial({color: 0xD08CFF});
var mrBox = new THREE.Mesh(box_geom, boxMaterial);

mrBox.castShadow = true; //default values
mrBox.receiveShadow = false;



//BLOB RIGHT
var sphere_geometry = new THREE.SphereGeometry(10, 128, 128);
// var sphere_geometry = new THREE.TorusGeometry( 10, 9, 16, 100 );
var material = new THREE.MeshStandardMaterial({color: 0x00d0ff, opacity: 0.8, transparent: true});
var sphere = new THREE.Mesh(sphere_geometry, material);

sphere.castShadow = true; //default values
sphere.receiveShadow = false;

sphere.position.x = 15;


//BLOB LEFT
var sphere_geometryTWO = new THREE.SphereGeometry(10, 128, 128);
var materialTWO = new THREE.MeshStandardMaterial({color: 0xfa00ff, opacity: 0.8, transparent: true});
var sphereTWO = new THREE.Mesh(sphere_geometryTWO, materialTWO);

sphereTWO.castShadow = true; //default values
sphereTWO.receiveShadow = false;

sphereTWO.position.x = -15;

scene.add(sphere, sphereTWO, light1, plane, ambLight);

// var sphere_geometryTWO = new THREE.MeshNormalMaterial()

var update = function(object) {
    //go through vertices here and reposition them

    for (let i = 0; i < object.geometry.vertices.length; i++) {
        let p = object.geometry.vertices[i];
    }
    object.geometry.verticesNeedUpdate = true; //must be set or vertices will not update

    object.geometry.computeVertexNormals(); //allows the textures map correctly
    object.geometry.normalsNeedUpdate = true;

		// get the average frequency of the sound
		let data = analyser.getAverageFrequency();
		// console.log(data);

    let time = (performance.now()* 0.0009) + (data*0.025) ; //this tracks the time, and slows it down!!!
		// console.log(time);

		let noiseSlider = document.getElementById("noise_scale");
		let k =	noiseSlider.value;

		let blobSlider = document.getElementById("blob_scale");
		let bS =	blobSlider.value; // BLOB SLIDER

		let b = data*bS  //blob

		let s = 10; //size of blob
		for (let i = 0; i < object.geometry.faces.length; i++) {
	    let uv = object.geometry.faceVertexUvs[0][i]; //faceVertexUvs is a huge arrayed stored inside of another array
	    let f = object.geometry.faces[i];
	    let p = object.geometry.vertices[f.a];//take the first vertex from each face
	    p.normalize().multiplyScalar(s+b*noise.perlin3(uv[0].x*k, uv[0].y*k, time));
		}

}

var animate = function (){
    requestAnimationFrame( animate );

    update(sphere);

		update(sphereTWO);

    renderer.render (scene, camera);

    sphere.rotation.z += 0.01;
    sphere.rotation.y += 0.01;

		sphereTWO.rotation.z -= 0.01;
    sphereTWO.rotation.y -= 0.01;


};


animate();
