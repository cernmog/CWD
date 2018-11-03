
// Task 03 - draw particles with weather data

var weather = [];
var index = 0;

var particles = [];

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
	
	var urlBeforeCoords = "http://api.openweathermap.org/data/2.5/weather?";
	var urlAfterCoords = "&units=metric&appid=071d07bd0b7a390c3dfe520cc40f26aa";
	
	for (var i = 0; i < cityLong.length; i++) {
		var longLatQuery = "lat="+cityLat[i]+"&lon="+cityLong[i];
		var query = urlBeforeCoords+longLatQuery+urlAfterCoords; 
		loadJSON(query, gotWeatherData); 
	}

	for (var i = 0; i < cityLong.length; i ++) {
		cityX[i] = mercX(cityLong[i]) - cx;
		cityY[i] = mercY(cityLat[i]) - cy;
		cityP[i] = map(cityPop[i], 100015, 22315474, 1, 10);
	}
}

function gotWeatherData(data) {
	weather[index] = data;
	particles.push(new Particle(cityX[index],cityY[index],cityP[index],weather[index]));
	index++;
}

function draw(){
	// Task 02
	translate((width/2), (height/2)); 
	// background(0,50);
	imageMode(CENTER);
	image(mapImg, 0, 0);

	var tempVals = [];
	
	for (var i = 0; i < particles.length; i++) {
		
		tempVals[i] = particles[i].weather.main.temp;
		stroke(map(tempVals[i], min(tempVals), max(tempVals), 0, 255));
		fill(map(tempVals[i], min(tempVals), max(tempVals), 0, 255));

		ellipse(cityX[i],cityY[i],cityP[i]);

		particles[i].update();
		particles[i].display();	
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

class Particle {
	
	constructor(startX, startY, startMass, weather){
		this.mass = startMass;
		this.startPos = createVector(startX, startY);
		this.pos = createVector(startX, startY);
		this.weather = weather;
	}

	update() {
		this.pos.x += random(-this.mass, this.mass);
		this.pos.y += random(-this.mass, this.mass);
	}

	display() {
		strokeWeight(1);
		ellipse(this.pos.x, this.pos.y,this.mass*2);
		line(this.startPos.x, this.startPos.y, this.pos.x, this.pos.y);
	}

}
