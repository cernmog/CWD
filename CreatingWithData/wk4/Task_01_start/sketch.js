
var mapImg;
var cityData;
var cityLong;
var cityLat;
var cityPop;
var cx;
var cy;
var cityX = [];
var cityY = [];
var cityP = [];

var queries = [];
var particles = [];

function preload() {
	mapImg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoic29maWFmZXJyYXJvMTk5NiIsImEiOiJjamZiMzQ1bmkzbXJ2MnpvNG1nd3Z2ZWl2In0._hdJnbjf7jxau1PkMoK7Cw');
	cityData = loadTable('city_vals_50.csv','csv','header');
}

function setup () {
	createCanvas(1024, 512);

	translate((width/2), (height/2));
	imageMode(CENTER);
	image(mapImg, 0, 0);

	cx = mercX(0);
	cy = mercY(0);

	cityLong = cityData.getColumn('longitude');
	cityLat = cityData.getColumn('latitude');
	cityPop = cityData.getColumn('population');

	for (var i=0; i<cityLong.length; i++){
		queries[i] = "http://api.openweathermap.org/data/2.5/weather?lat="+cityLat[i]+"&lon="+cityLong[i]+"&units=metirc&APPID=15a0900603928463fe050dab9fdc9e8d";
		// console.log(queries[i]);
	}

	for (var i = 0; i < cityLong.length; i ++) {
    cityX[i] = mercX(cityLong[i]) - cx;
		cityY[i] = mercY(cityLat[i]) - cy;
		cityP[i] = map(cityPop[i], 100015, 22315474, 1, 5);

		noStroke();
    // fill(255, 255, 255, 255);
		ellipse(cityX[i],cityY[i],cityP[i]);
	}

	for (var i=0; i<cityLong.length; i++){
		particles.push(new Particle(cityX[i], cityY[i], cityP[i], queries[i]));
	}
}

class Particle {
	constructor(startX, startY, startMass, query){
		this.mass = startMass;
		this.startPos = createVector(startX, startY);
		this.pos = createVector(startX, startY);
		this.weather = loadJSON(query);
	}
	update(){
		this.pos.x += random(-this.mass, this.mass);
		this.pos.y += random(-this.mass, this.mass);
		// console.log(this.weather.main.temp);
	}
	display(){
		stroke(255);
		strokeWeight(1);

		ellipse(this.pos.x, this.pos.y, this.mass);
		line(this.startPos.x, this.startPos.y, this.pos.x, this.pos.y);
		// console.log(this.weather.main.temp);
	}
}

function draw(){
	translate((width/2), (height/2));
	imageMode((CENTER));
	image(mapImg, 0, 0);

	for (var i = 0; i<particles.length; i++){
		particles[i].update();
		particles[i].display();

		// fill(255,255,(particles[i].weather.main.temp));
	}
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
