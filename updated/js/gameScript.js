// The attributes of the player.
var player;

// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};

// The friction and gravity to show realistic movements
var gravity = 0.5;
var friction = 0.7;

//Speed and Score
var speed;
var score;
var prevPlat = "#fc0";

// Has the user pressed space bar yet
var isPlaying;
var gameStatus=-1;

// The platforms
var platforms;

// Colors of platforms
var colors = ["#fc0", "#f36", "#09f", "#f90", "#85f", "#0fa"];
colorNum = 0;

var img;
var img2;
var imgcount = 0;

//Inititialize Shit
function inititializeThings(){
  player = {
      x: 50,    //Initial Spawn Position
      y: 200,
      x_v: 0,
      y_v: 0,
      jump : true,
      height: 20,
      width: 20
  };
  speed = 2;
  score=0;
  prevPlat = "#fc0";

  isPlaying = false;
  platforms = [];
  colorNum = 0;
  renderPlayerInit();
  createplat();
  renderScore();
}

function renderScore(){
  // ctx.font="100px";
  ctx.fillStyle = prevPlat;
  ctx.textAlign = "right";

  if(gameStatus == -1 || gameStatus == 1 ){
    ctx.font = "15px Tahoma";
    ctx.fillText("Up/Tap/Click", 300, 30);
  }
  else if(gameStatus == 0 && score<3){
    ctx.fillText("Up/Tap/Click" , 300, 30);
  }

  ctx.fillText("Score: " + score, 300, 60);

}

function stop(){
  isPlaying = false;
}

// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, 500, 300);
}

// // Function to render the player
// function renderplayer(){
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
// }

function renderPlayerInit(){
  img = new Image();
    img.onload = function() {
    }
  img.src = "ghost.svg";

  img2 = new Image();
    img2.onload = function() {
    }
  img2.src = "ghost2.svg";
}

function renderplayer(){
  // if (imgcount++%2==0){
  //   ctx.drawImage(img, player.x-28, player.y-40, 40, 40);
  // }else{
  //   ctx.drawImage(img2, player.x-28, player.y-40, 40, 40);
  // }
  ctx.drawImage(img, player.x-28, player.y-40, 40, 40);

}

// Function to create platforms
function createplat(){
  platforms.push({
      x: 0,
      y: 262,
      width: 300,
      height: 15,
      color: colors[(colorNum++)%6]
  });
  platforms.push({
      x: 340,
      y: 250,
      width: 200,
      height: 15,
      color: colors[(colorNum++)%6]
  });
}

// Function to render platforms
function renderplat(){
  for(var i=0; i<platforms.length;i++){
    ctx.fillStyle = platforms[i].color;
    ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
  }
}

function renderplat2(){
  for(var i=0; i<platforms.length;i++){
    ctx.fillStyle = platforms[i].color;
    var x = platforms[i].x;
    var y = platforms[i].y;
    var w = platforms[i].width;
    var h = platforms[i].height;
    var radius = 4;

    var r = x + w;
    var b = y + h;
    ctx.beginPath();
    ctx.strokeStyle=platforms[i].color;
    ctx.lineWidth=2;
    ctx.moveTo(x+radius, y);
    ctx.lineTo(r-radius, y);
    ctx.quadraticCurveTo(r, y, r, y+radius);
    ctx.lineTo(r, y+h-radius);
    ctx.quadraticCurveTo(r, b, r-radius, b);
    ctx.lineTo(x+radius, b);
    ctx.quadraticCurveTo(x, b, x, b-radius);
    ctx.lineTo(x, y+radius);
    ctx.quadraticCurveTo(x, y, x+radius, y);
    ctx.stroke();
    ctx.fill();

  }
}

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the up arrow key

    if(e.keyCode == 38 && gameStatus==1){
        inititializeThings();
        isPlaying = true;
        gameStatus = 0;
    }

    if(e.keyCode == 38){ // || e.keyCode == 32) {
        if(player.jump == false) {
            player.y_v = -10;
        }
        isPlaying = true;
        gameStatus = 0;
    }

    // // 37 is the code for the left arrow key
    // if(e.keyCode == 37) {
    //     keys.left = true;
    // }
    //
    // // 39 is the code for the right arrow key
    // if(e.keyCode == 39) {
    //     keys.right = true;
    // }

    // 82 is the code for the r

}

// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38){ // || e.keyCode == 32) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
}

function platformInit(){
  platforms.push(
      {
      x: 520 + Math.floor(Math.random() * 50),
      y: 200 + Math.floor(Math.random() * 80),
      width: 100 + Math.floor(Math.random() * 100),
      height: 15,
      color: colors[(colorNum++)%6]
      }
  );
}

function managePlatforms(){
  if (isPlaying){
    for(var i=0; i<platforms.length;i++){
      platforms[i].x -= speed;
      if(platforms[i].x + platforms[i].width < 0){
        platforms.splice(i,1);
      }
    }
    if (platforms[platforms.length-1].x + platforms[platforms.length-1].width < 500){
      platformInit();
    }
  }
}

function loop() {

  managePlatforms();

    // If the player is not jumping apply the effect of frictiom
    if(player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;

    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        player.x_v = -2.5;
    }
    if(keys.right) {
        player.x_v = 2.5;
    }

    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;

    // A simple code that checks for collions with the platform
    let coli = -1;

    for(var i=0; i<platforms.length;i++){
      if(platforms[i].x < player.x && player.x < platforms[i].x + platforms[i].width + player.width  &&
      platforms[i].y < player.y && player.y < platforms[i].y + platforms[i].height){
          coli = i;
      }
    }

    if (coli > -1){
        player.jump = false;
        player.y = platforms[coli].y;
    }

    if (coli!=-1 && platforms[coli].color != prevPlat){
      prevPlat = platforms[coli].color;

      score++;
      speed = (score/3)+0.5;
      if(speed<2){
        speed=2;
      }
    }

    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat2();
    renderScore();

    // console.log(player.y);

    if(player.y > 300){
      isPlaying = false;
      gameStatus = 1;
      // showScore();
    }

}

canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
ctx.canvas.height = 300;
ctx.canvas.width = 350;

inititializeThings();

gameClick = document.getElementById("canvas");

gameClick.onclick = function() {
  if(gameStatus==1){
    inititializeThings();
    isPlaying = true;
    gameStatus = 0;
  }else{
    if(player.jump == false) {
        player.y_v = -10;
    }
    isPlaying = true;
    gameStatus = 0;
  }
};

// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);

setInterval(loop,20);
