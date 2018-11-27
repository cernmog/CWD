var GPUdata = [];

var memSpeedRAW = []; //memory speed RAW
var mPowerRAW = []; //max power RAW
var bClockRAW = []; //boost clock RAW
var coreSpRAW = []; //core speed RAW
var memoryRAW = []; //memory RAW
var memBandRAW = [];  //memory bandwidth RAW
var mBusRAW = []; //memory bus RAW

var name = []; // Name of card
var manuf = []; // Who made card
var memSpeed = []; //memory speed CLEAN
var mPower = []; //max power CLEAN
var bClock = []; //boost clock CLEAN
var coreSp = []; //core speed CLEAN
var memory = []; //memory CLEAN
var memBand = []; //memory bandwidth CLEAN
var mBus = []; //memory bus CLEAN
var openGl = []; //version of openGL
var shad = []; //version of shader

var topMargin = 50;
var plotHeight = 500;
var surplus = 20; // unused axis space

// Vertical line coordinates (150 gap in between!)
  var mSpeedX = 100;
  var mPowerX = 250;
  var bClockX = 400;
  var coreSpX = 550;
  var memX = 700;
  var memBandX = 850;
  var mBusX = 1000;
  var openGlX = 1150;

// Ticks
  var numTicks = 5;
  var tickWidth = 10;
  var maxTickY = topMargin + surplus;
  var minTickY = topMargin + plotHeight - surplus;

function preload() {
    GPUdata = loadTable('GPUs.csv', 'csv', 'header');
}

var topMargin = 50;

var plotHeight = 500;

var surplus = 20; // unused axis space

function setup() {

  // IF ANY NULL IN EACH ROW, REMOVE THE WHOLE ROW... LEAVING NO MISSING DATA
  for (var i = 0; i < GPUdata.rows.length; i++){
    for (var n = 0; n < 12 ; n++){
      if (GPUdata.rows[i].arr[n] == "NULL"){
        GPUdata.removeRow(i);
        n = 12; //ends the if statement
        i--; //because the row is deleted, need to put pointer back to -1
      }
    }
  }

  //Grabbing colummns from CSV file and storing in seperate arrays
  name = GPUdata.getColumn('Name');
  manuf = GPUdata.getColumn('Manufacturer');
  memSpeedRAW = GPUdata.getColumn('Memory_Speed');
  mPowerRAW = GPUdata.getColumn('Max_Power');
  bClockRAW = GPUdata.getColumn('Boost_Clock');
  coreSpRAW = GPUdata.getColumn('Core_Speed');
  memoryRAW = GPUdata.getColumn('Memory');
  memBandRAW = GPUdata.getColumn('Memory_Bandwidth');
  mBusRAW = GPUdata.getColumn('Memory_Bus');
  openGl = GPUdata.getColumn('Open_GL');

  doCleaning (memSpeedRAW, memSpeed, 4); //CLEANS the units from the Memory Speed field!
  doCleaning (mPowerRAW, mPower, 6); //CLEANS the units from the Max Power field!
  doCleaning (bClockRAW, bClock, 5) //CLEANS the units from the Boost Clock field!
  doCleaning (coreSpRAW, coreSp, 4) //CLEANS the units from the Core Speed field!
  doCleaning (memoryRAW, memory, 4) //CLEANS the units from the Memory field!
  doCleaning (memBandRAW, memBand, 6) //CLEANS the units from the Memory Bandwidth field!
  doCleaning (mBusRAW, mBus, 5) //CLEANS the units from the Memory Bus field!

  memSpeedMIN = getMinVal(memSpeed);
  memSpeedMAX = getMaxVal(memSpeed);
  mPowerMIN = getMinVal(mPower);
  mPowerMAX = getMaxVal(mPower);
  bClockMIN = getMinVal(bClock);
  bClockMAX = getMaxVal(bClock)
  coreSpMIN = getMinVal(coreSp);
  coreSpMAX = getMaxVal(coreSp);
  memoryMIN = getMinVal(memory);
  memoryMAX = getMaxVal(memory);
  memBandMIN = getMinVal(memBand);
  memBandMAX = getMaxVal(memBand);
  mBusMIN = getMinVal(mBus);
  mBusMAX = getMaxVal(mBus);
  openGlMIN = getMinVal(openGl)
  openGlMAX = getMaxVal(openGl)

  console.log(memSpeedMIN, memSpeedMAX);
  console.log(mPowerMIN, mPowerMAX);
  console.log(bClockMIN, bClockMAX);
  console.log(coreSpMIN, coreSpMAX);
  console.log(memoryMIN, memoryMAX);
  console.log(memBandMIN, memBandMAX);
  console.log(mBusMIN, mBusMAX);
  console.log(openGlMIN, openGlMAX);

  createCanvas(1310, plotHeight + topMargin + 200);

  background (0);
}

GameFlowState = {

    UNKNOWN : 0,
    ALL : 1,
    NVIDIA : 2,
    AMD : 3,
    ATI : 4,
    INTEL : 5,
    CLEAR: 6
};

class FlowState{
  constructor(){
    this.currentState = GameFlowState.ALL;
  }
  Update(){
    switch (this.currentState){

      case GameFlowState.ALL:


      break;

      case GameFlowState.NVIDIA:


      break;

      case GameFlowState.AMD:


      break;

      case GameFlowState.ATI:


      break;

      case GameFlowState.INTEL:


      break;

      case GameFlowState.CLEAR:

      break;
    }
  }
}

var flowState = new FlowState();

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
  var keyCode = event.keyCode;
  if (keyCode == 49) { //NUMBER ONE KEY

    flowState.currentState = GameFlowState.NVIDIA;

    // console.log("NUMBER ONE KEY");

    // console.log("NUMBER TWO KEY");
    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]
      var manuColour = 'black';
      if (manuf[i] == 'Nvidia'){ manuColour = ("#6e40aa");
      strokeWeight(0.1);
      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      stroke(manuColour);

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );
    }
    else {i++
    };
  }



  } else if (keyCode == 50) { //NUMBER TWO KEY

    flowState.currentState = GameFlowState.AMD;

    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]
      var manuColour = 'black';
      if (manuf[i] == 'AMD'){ manuColour = ("#ee4395");
      strokeWeight(0.1);
      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      stroke(manuColour);

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );
    }
    else {i++
    };
  }


  } else if (keyCode == 51) { //NUMBER THREE KEY

    flowState.currentState = GameFlowState.ATI;

    // console.log("NUMBER THREE KEY");

    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]
      var manuColour = 'black';
      if (manuf[i] == 'ATI'){ manuColour = ("#ff8c38");
      strokeWeight(0.1);
      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      stroke(manuColour);

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );
    }
    else {i++};
  }

  } else if (keyCode == 52) { //NUMBER FOUR KEY

    flowState.currentState = GameFlowState.INTEL;

    // console.log("NUMBER FOUR KEY");

    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]
      var manuColour = 'black';
      if (manuf[i] == 'Intel'){ manuColour = ("#aff05b");
      strokeWeight(1);
      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      stroke(manuColour);

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );
    }
    else {i++};
  }

  } else if (keyCode == 32) { //SPACE KEY (reset)

    flowState.currentState = GameFlowState.ALL;


    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]

      var manuColour = 'black';
      if (manuf[i] == 'Nvidia'){ manuColour = ("#6e40aa");
      strokeWeight(0.1);}
      else if (manuf[i] == 'AMD'){ manuColour = '#ee4395';
      strokeWeight(0.1);}
      else if (manuf[i] == 'ATI'){ manuColour = '#ff8c38';
      strokeWeight(0.1);}
      //As there are only a few enteries for Intel, they need to be thicker to show up nicer
      else if (manuf[i] == 'Intel'){ manuColour = '#aff05b';
      strokeWeight(1);}
      //fill(color);}
      stroke(manuColour);

      // console.log(visibleNVIDIA, visibleAMD, visibleATI, visibleINTEL);

      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );

    }

  } else if (keyCode == 67) { //SPACE KEY (reset)

    flowState.currentState = GameFlowState.CLEAR;


    for (var i = 0; i < GPUdata.rows.length; i++){
      // COLOURS ["#6e40aa","#ee4395","#ff8c38","#aff05b"]

      var manuColour = 'black';
      stroke(manuColour);
      strokeWeight(200);
      // console.log(visibleNVIDIA, visibleAMD, visibleATI, visibleINTEL);

      var mSpeedY = map( memSpeed[i], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerY = map( mPower[i], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockY = map( bClock[i], bClockMIN, bClockMAX, minTickY, maxTickY)
      var coreSpY = map( coreSp[i], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memY = map( memory[i], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandY = map( memBand[i], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusY = map( mBus[i], mBusMIN, mBusMAX, minTickY, maxTickY)
      var openGlY = map( openGl[i], openGlMIN, openGlMAX, minTickY, maxTickY)

      line ( mSpeedX, mSpeedY, mPowerX, mPowerY );
      line ( mPowerX, mPowerY, bClockX, bClockY );
      line ( bClockX, bClockY, coreSpX, coreSpY );
      line ( coreSpX, coreSpY, memX, memY );
      line ( memX, memY, memBandX, memBandY );
      line ( memBandX, memBandY, mBusX, mBusY );
      line ( mBusX, mBusY, openGlX, openGlY );

    }

  }
 }

//Function to take old array, remove the last characters from units, put into new array
function doCleaning (rawArr, arr, rem){       //Raw array, Clean array, number to remove by
  for (let i = 0; i < rawArr.length; i++){
    let str = rawArr[i];
    str = str.substring(0, str.length - rem);
    arr.push(str);
  }
}

function getMinVal(arr){
  let minValue = Math.min.apply(null, arr)
  return minValue;
}

function getMaxVal(arr){
  let maxValue = Math.max.apply(null, arr)
  return maxValue;
}

function getMedian(arr){
    arr.sort(function(a,b) {return a - b;});
    var half = Math.floor(arr.length/2);
     if(arr.length % 2)
         return arr[half];
     else
         return (arr[half-1] + arr[half]) / 2.0;
}

function getMedianIndex(arr){
  for (var i = 0; i < arr.length; i++){
      if (arr[i] == getMedian(arr)){
        return i;
      }
  }
}

function draw() {

  flowState.Update();

  // console.log("Current State "+flowState.currentState);

  textSize(18);
  strokeWeight(0);

  // Legend for line colors
  textAlign(LEFT);

  strokeWeight(3);
  stroke('#6e40aa');
  fill('#6e40aa');
  line(openGlX + 50, 300, openGlX + 90, 300);
  strokeWeight(0);
  text('Nvidia', openGlX + 100, 305);

  stroke('#ee4395');
  fill('#ee4395');
  strokeWeight(3);
  line(openGlX + 50, 330, openGlX + 90, 330);
  strokeWeight(0);
  text('AMD', openGlX + 100, 335);

  stroke('#ff8c38');
  fill('#ff8c38');
  strokeWeight(3);
  line(openGlX + 50, 360, openGlX + 90, 360);
  strokeWeight(0);
  text('ATI', openGlX + 100, 365);

  stroke('#aff05b');
  fill('#aff05b')
  strokeWeight(3);
  line(openGlX + 50, 390, openGlX + 90, 390);
  strokeWeight(0);
  text('Intel', openGlX + 100, 395);

  fill(255);
  stroke(255);
  strokeWeight(3);

// Vertical lines
  line(mSpeedX, topMargin, mSpeedX, topMargin + plotHeight);
  line(mPowerX, topMargin, mPowerX, topMargin + plotHeight);
  line(bClockX, topMargin, bClockX, topMargin + plotHeight);
  line(coreSpX, topMargin, coreSpX, topMargin + plotHeight);
  line(memX, topMargin, memX, topMargin + plotHeight);
  line(memBandX, topMargin, memBandX, topMargin + plotHeight);
  line(mBusX, topMargin, mBusX, topMargin + plotHeight);
  line(openGlX, topMargin, openGlX, topMargin + plotHeight);

  strokeWeight(0);

// Collumn name
  textAlign(CENTER);
  text('Memory Speed', mSpeedX, topMargin + plotHeight + 20);
  text('Max Power', mPowerX, topMargin + plotHeight + 20);
  text('Boost Clock', bClockX, topMargin + plotHeight + 20);
  text('Core Speed', coreSpX, topMargin + plotHeight + 20);
  text('Memory', memX, topMargin + plotHeight + 20);
  text('Memory Bandwidth', memBandX, topMargin + plotHeight + 20);
  text('Memory Bus', mBusX, topMargin + plotHeight + 20);
  text('Open GL', openGlX, topMargin + plotHeight + 20);

  //Controls!!
  textSize(20);
  text('Controls:', mSpeedX + 80, topMargin + plotHeight + 150);
  strokeWeight(0);
  fill('#6e40aa');
  text('Key 1: Nvidia', mSpeedX + 200, topMargin + plotHeight + 150);
  fill('#ee4395');
  text('Key 2: AMD', mSpeedX + 330, topMargin + plotHeight + 150);
  fill('#ff8c38');
  text('Key 3: ATI', mSpeedX + 450, topMargin + plotHeight + 150);
  fill('#aff05b');
  text('Key 4: Intel', mSpeedX + 570, topMargin + plotHeight + 150);
  fill(255);
  text('Key C: Clear', mSpeedX + 200, topMargin + plotHeight + 180);
  text('Space: Show all', mSpeedX + 350, topMargin + plotHeight + 180);

  //TITLE

  textAlign(RIGHT);
  textSize(40);
  text('GPU Comparison', openGlX, topMargin + plotHeight + 100);


      // THESE MAP THE MEDIAN VALUES FOR EACH ON SCALE
      var mSpeedMed = map( memSpeed[getMedianIndex(memSpeed)], memSpeedMIN, memSpeedMAX, minTickY, maxTickY )
      var mPowerMed = map( mPower[getMedianIndex(mPower)], mPowerMIN, mPowerMAX, minTickY, maxTickY )
      var bClockMed = map( bClock[getMedianIndex(bClock)], bClockMIN, bClockMAX, minTickY, maxTickY )
      var coreSpMed = map( coreSp[getMedianIndex(coreSp)], coreSpMIN, coreSpMAX, minTickY, maxTickY )
      var memMed = map( memory[getMedianIndex(memory)], memoryMIN, memoryMAX, minTickY, maxTickY )
      var memBandMed = map( memBand[getMedianIndex(memBand)], memBandMIN, memBandMAX, minTickY, maxTickY )
      var mBusMed = map( mBus[getMedianIndex(mBus)], mBusMIN, mBusMAX, minTickY, maxTickY )
      var openGlMed = map( openGl[getMedianIndex(openGl)], openGlMIN, openGlMAX, minTickY, maxTickY )

      stroke(255);
      textAlign(RIGHT);
      textSize(18);
      strokeWeight(0.5);

      //mem speed max scale
      line(mSpeedX-tickWidth, maxTickY, mSpeedX, maxTickY);
      text(memSpeedMAX+" MHz", mSpeedX-tickWidth-5, maxTickY + 5);
      //mem speed min scale
      line(mSpeedX-tickWidth, minTickY, mSpeedX, minTickY);
      text(memSpeedMIN+" MHz", mSpeedX-tickWidth-5, minTickY + 5);
      //max power max scale
      line(mPowerX-tickWidth, maxTickY, mPowerX, maxTickY);
      text(mPowerMAX+" Watts", mPowerX-tickWidth-5, maxTickY + 5);
      //max power min scale
      line(mPowerX-tickWidth, minTickY, mPowerX, minTickY);
      text(mPowerMIN+" Watts", mPowerX-tickWidth-5, minTickY + 5);
      //boost clock max scale
      line(bClockX-tickWidth, maxTickY, bClockX, maxTickY);
      text(bClockMAX+" MHz", bClockX-tickWidth-5, maxTickY + 5);
      //boost clock min scale
      line(bClockX-tickWidth, minTickY, bClockX, minTickY);
      text(bClockMIN+" MHz", bClockX-tickWidth-5, minTickY + 5);
      //core speed max scale
      line(coreSpX-tickWidth, maxTickY, coreSpX, maxTickY);
      text(coreSpMAX+" MHz", coreSpX-tickWidth-5, maxTickY + 5);
      //core speed min scale
      line(coreSpX-tickWidth, minTickY, coreSpX, minTickY);
      text(coreSpMIN+" MHz", coreSpX-tickWidth-5, minTickY + 5);
      //memory max scale
      line(memX-tickWidth, maxTickY, memX, maxTickY);
      text(memoryMAX+" MB", memX-tickWidth-5, maxTickY + 5);
      //memory min scale
      line(memX-tickWidth, minTickY, memX, minTickY);
      text(memoryMIN+" MB", memX-tickWidth-5, minTickY + 5);
      //memory bandwidth max scale
      line(memBandX-tickWidth, maxTickY, memBandX, maxTickY);
      text(memBandMAX+" GB/sec", memBandX-tickWidth-5, maxTickY + 5);
      //memory bandwidth min scale
      line(memBandX-tickWidth, minTickY, memBandX, minTickY);
      text(memBandMIN+" GB/sec", memBandX-tickWidth-5, minTickY + 5);
      //memory bus max scale
      line(mBusX-tickWidth, maxTickY, mBusX, maxTickY);
      text(memBandMAX+" Bit", mBusX-tickWidth-5, maxTickY + 5);
      //memory bus min scale
      line(mBusX-tickWidth, minTickY, mBusX, minTickY);
      text(memBandMIN+" Bit", mBusX-tickWidth-5, minTickY + 5);
      //openGL max scale
      line(openGlX-tickWidth, maxTickY, openGlX, maxTickY);
      text(openGlMAX, openGlX-tickWidth-5, maxTickY + 5);
      //openGL min scale
      line(openGlX-tickWidth, minTickY, openGlX, minTickY);
      text(openGlMIN, openGlX-tickWidth-5, minTickY + 5);

      textSize(15);
      //mem speed median value scale
      line(mSpeedX-tickWidth, mSpeedMed, mSpeedX, mSpeedMed);
      text((getMedian(memSpeed))+" MHz", mSpeedX-tickWidth-5, mSpeedMed + 5);
      //max power median value scale
      line(mPowerX-tickWidth, mPowerMed, mPowerX, mPowerMed);
      text((getMedian(mPower))+" Watts", mPowerX-tickWidth-5, mPowerMed + 5);
      //boost clock median value scale
      line(bClockX-tickWidth, bClockMed, bClockX, bClockMed);
      text((getMedian(bClock))+" MHz", bClockX-tickWidth-5, bClockMed + 5);
      //Core speed Median value scale
      line(coreSpX-tickWidth, coreSpMed, coreSpX, coreSpMed);
      text((getMedian(coreSp))+" MHz", coreSpX-tickWidth-5, coreSpMed + 5);
      //Memory Median value scale
      line(memX-tickWidth, memMed, memX, memMed);
      text((getMedian(memory))+" MHz", memX-tickWidth-5, memMed + 5);
      //Memory Bandwidth Median value scale
      line(memBandX-tickWidth, memBandMed, memBandX, memBandMed);
      text((getMedian(memBand))+" GB/sec", memBandX-tickWidth-5, memBandMed + 5);
      //Memory Bus Median value scale
      line(mBusX-tickWidth, mBusMed, mBusX, mBusMed);
      text((getMedian(mBus))+" Bit", mBusX-tickWidth-5, mBusMed + 5);
}
