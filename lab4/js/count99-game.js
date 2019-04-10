//global constants
var context;
var width = 300;
var height = 410;
var barSizeWidth = 50;
var barSizeHeight = 10;
var bars = new Array();
var step = 40;
var radius = 10;
var ballx = 100;
var bally = height-radius;
var ballVx = 0;
var intervalId;
var ballMove = false;
var score = 0;
var colors = new Array();
var scoreDiv;

//this function is called first when whole page gets loaded
function init() {
  clearTimeout(intervalId);
  gameOver();
  context;
  width = 300;
  height = 410;
  barSizeWidth = 50;
  barSizeHeight = 10;
  bars = new Array();
  step = 40;
  radius = 10;
  ballx = 100;
  bally = height-radius;
  ballVx = 0;
  intervalId;
  ballMove = false;
  score = 0;
  colors = new Array();
  scoreDiv;
  context = document.getElementById("canvas").getContext("2d");
  context.beginPath();
  drawRect();

  colors.push("#000000");
  colors.push("#BA1E45");
  colors.push("#DE2FC4");
  colors.push("#6A1FED");
  colors.push("#0ABF2E");
  colors.push("#ABB31B");
  colors.push("#C95B12");

  //initializes the first set of bars
  initBars();

  //assigns a function to be called repeatedly
  intervalId = setInterval(gameProcess,1000/30);


  scoreDiv = document.getElementById("score");

  //bind keyUp and keyDown events
  window.onkeydown = keydown;
  window.onkeyup = keyup;
}

function keydown(e) {
  if(e.keyCode ==37) {
    //left arrow
    ballMove = true;
    ballVx = -4;
  } else if(e.keyCode ==39) {
    //right arrow
    ballMove = true;
    ballVx = 4;
  }
}

function keyup(e) {
  if(e.keyCode ==37) {
    ballMove = false;
    ballVx = 0;
  } else if(e.keyCode ==39) {
    ballMove = false;
    ballVx = 0;
  }
}

function initBars() {
  var y = height-barSizeHeight;
  var noOfBars = y/step;
  for(var v=0;v<noOfBars;v++) {
    var j = (width-barSizeWidth)*Math.random();
    bars.push({"x":j,"y":y,"color":colors[Math.floor(6*Math.random())]});
    y-=step;
  }

}

function gameProcess() {
  clear();
  drawRect();

  moveBars();

  if(ballMove)
    moveBall();

  drawBall(ballx,bally);

  drawBars();
  checkCollision();
}

function moveBall() {
  if(!((ballx<=radius-ballVx&&ballVx<0)||(ballx>=width-radius-ballVx&&ballVx>0))) {
    ballx += ballVx;
  }
}

function checkCollision() {
  for(var i=0;i<2;i++) {
    if(bars[i].y==bally-radius-barSizeHeight&&(ballx>=bars[i].x&&ballx<=bars[i].x+barSizeWidth)) {
      clearTimeout(intervalId);
      gameOver();
      // init()
    }
  }
}

function moveBars() {
  if(bars.length>0&&bars[0].y==height-2) {
    bars.shift();

    score+=20;
    scoreDiv.innerHTML = "Счёт : "+score;

    var j = (width-barSizeWidth)*Math.random();
    bars.push({"x":j,"y":-barSizeHeight,"color":colors[Math.floor(6*Math.random())]});
  }

  for(var i=0;i<bars.length;i++) {
    bars[i].y += 2;
  }
}

function drawBall(x,y) {
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(x,y,radius,0,2*Math.PI,true);
  context.closePath();
  context.fill();
}

function drawBars() {
  for(var i=0;i<bars.length;i++) {
    drawBar(bars[i].x,bars[i].y,bars[i].color);
  }
}

function clear() {
  context.clearRect(0,0,width,height);
}

function drawRect() {
  context.beginPath();
  context.strokeRect(0,0,width,height);
  context.closePath();
  context.fill();
}

function drawBar(x,y,color) {
  context.fillStyle = color;
  //context.fillStyle = colors[Math.floor(6*Math.random())];
  context.beginPath();
  context.fillRect(x,y,barSizeWidth,barSizeHeight);
  context.closePath();
  context.fill();
}

function gameOver() {
  document.getElementById("status").innerHTML = "";
}

window.addEventListener("load",init,true);


