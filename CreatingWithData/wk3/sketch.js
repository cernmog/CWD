var mapImg;

var iss_position;

var cityData;

var astroData;

var spin = 1;

var wordData;

var para;

var gotWord;

function preload() {
	mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic29maWFmZXJyYXJvMTk5NiIsImEiOiJjamZiMzQ1bmkzbXJ2MnpvNG1nd3Z2ZWl2In0._hdJnbjf7jxau1PkMoK7Cw');
	loadJSON("http://api.open-notify.org/iss-now.json", gotISSData);
	cityData = loadTable('city_vals.csv','header');

	loadJSON("http://api.open-notify.org/astros", gotAstroData);

	loadJSON("E_W.json", gotWordData);
}

function setup () {
	createCanvas(1024, 512);
	console.log(mapImg);


	// fill(255, 0, 255, 200);
	strokeWeight(0.5);
	stroke(255,0,255);

	para = createP("This piece of work is ", gotWord);
	console.log(para);

}

function draw() {
	translate((width/2), (height/2)); // translate moves origin point from top left to centre
	imageMode(CENTER); // locations are going to be relative to origin point
	image(mapImg, 0, 0); // draw image of map

	loadJSON("http://api.open-notify.org/iss-now.json", gotISSData);

	var cx = mercX(0);
	var cy = mercY(0);

	var cityLong = cityData.getColumn('longitude');
	var cityLat = cityData.getColumn('latitude');
	var populat = cityData.getColumn('population')

	for (var i=0; i<cityLong.length; i++){
		var cityX = mercX(cityLong[i]) - cx;
		var cityY = mercY(cityLat[i]) - cy;

		var cityPop = map(populat[i],100015,22315474,1,80);

		fill(255, 0, 255, 200);
		ellipse (cityX, cityY, cityPop, cityPop,);
	}

	var ISSx = mercX(iss_position.longitude) - cx;
	var ISSy = mercY(iss_position.latitude) - cy;

	fill(0, 0, 255, 200);
	ellipse(ISSx, ISSy, 10, 10);

	push();
		translate(ISSx, ISSy);
		angleMode(DEGREES);
		spin++;
		rotate(spin);
		for (let i=0; i<astroData.length; i++){
					// console.log("hello", astroData[i].name);
					fill(255);
					textSize(10);

					angleMode(RADIANS);
					rotate(90);
					text(astroData[i].name, 0, 0);
		}
	pop();



	document.addEventListener("keydown", onDocumentKeyDown, false);

	function onDocumentKeyDown(event) {
	  var keyCode = event.keyCode;
		if (keyCode == 38){
			gotWord = wordData;
		}
}

}

function gotISSData(data){
	iss_position = data.iss_position;
}

function gotAstroData(data){
	astroData = data.people;
	console.log("astros!!", astroData);
}



function gotWordData(data){
		function getRandomInt(max) {
		  return Math.floor(Math.random() * Math.floor(max));
		}
		wordData = data.encouraging_words[(getRandomInt(48))];
		console.log("HERE IS WORDS", wordData);
	}


function mercX(lon) {
		lon = radians(lon);
		var a = (256 / PI) * pow(2, 1);
		var b = lon + PI;
		return a * b;
	}

	function mercY(lat) {
		lat = radians(lat);
		var a = (256 / PI) * pow(2, 1);
		var b = tan(PI / 4 + lat / 2);
		var c = PI - log(b);
		return a * c;
	}
