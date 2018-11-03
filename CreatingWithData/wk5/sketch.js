
var mapImg;
var cityData;
var cityLong = [];
var cityLat = [];
var cityPop = [];
var cx;
var cy;
var cityX = [];
var cityY = [];
var cityP = [];

function preload() {
	mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic29maWFmZXJyYXJvMTk5NiIsImEiOiJjamZiMzQ1bmkzbXJ2MnpvNG1nd3Z2ZWl2In0._hdJnbjf7jxau1PkMoK7Cw');
	// cityData = loadTable('city_vals_50.csv','csv','header');
	cityData = loadJSON('loadJson.php');
}

function setup () {
	createCanvas(1024, 512);

	console.log(cityData);

	translate((width/2), (height/2));
	imageMode(CENTER);
	image(mapImg, 0, 0);

	cx = mercX(0);
	cy = mercY(0);

//USE FOR JSON
	for (let i=0; i<50; i++){
		cityLong.push(cityData[i].longitude);
		cityLat.push(cityData[i].latitude);
		cityPop.push(cityData[i].population);
	}

// THIS IS ONLY USED FOR LOADING A TABLE
	// cityLong = cityData.getColumn('longitude');
	// cityLat = cityData.getColumn('latitude');
	// cityPop = cityData.getColumn('population');

	for (var i = 0; i < cityLong.length; i ++) {
		cityX[i] = mercX(cityLong[i]) - cx;
		cityY[i] = mercY(cityLat[i]) - cy;
		cityP[i] = map(cityPop[i], 100015, 22315474, 1, 5);

		noStroke();
		fill(255, 255, 255, 255);
		ellipse(cityX[i],cityY[i],cityP[i]);
	}
}

function draw(){

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
