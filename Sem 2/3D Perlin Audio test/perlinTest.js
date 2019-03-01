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

var sphere_geometry = new THREE.SphereGeometry(10, 128, 128);
// var sphere_geometry = new THREE.TorusGeometry( 10, 9, 16, 100 );
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);

var update = function() {
    //go through vertices here and reposition them

    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
    }
    sphere.geometry.verticesNeedUpdate = true; //must be set or vertices will not update

    // sphere.geometry.computeVertexNormals(); //allows the textures map correctly
    // sphere.geometry.normalsNeedUpdate = true;

		// get the average frequency of the sound
		var data = analyser.getAverageFrequency();
		// console.log(data);

    var time = (performance.now()* 0.0009) + (data*0.025) ; //this tracks the time, and slows it down!!!
		// console.log(time);

		var noiseSlider = document.getElementById("noise_scale");
		let k =	noiseSlider.value;

		var blobSlider = document.getElementById("blob_scale");
		let bS =	blobSlider.value; // BLOB SLIDER

		let b = data*bS  //blob

		var s = 20; //size of blob
		for (var i = 0; i < sphere.geometry.faces.length; i++) {
	    var uv = sphere.geometry.faceVertexUvs[0][i]; //faceVertexUvs is a huge arrayed stored inside of another array
	    var f = sphere.geometry.faces[i];
	    var p = sphere.geometry.vertices[f.a];//take the first vertex from each face
	    p.normalize().multiplyScalar(s+b*noise.perlin3(uv[0].x*k, uv[0].y*k, time));
		}

}

var animate = function (){
    requestAnimationFrame( animate );

    update();

    renderer.render (scene, camera);

    sphere.rotation.z += 0.01;
    sphere.rotation.y += 0.01;

};


animate();
