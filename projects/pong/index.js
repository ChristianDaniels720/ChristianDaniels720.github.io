/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
        "SPACE": 32,
        "UP": 38,    
        "DOWN": 40,
        "S": 83,
        "W": 87
  };
  const maxPoints = 11;
  
  // Game Item Objects
    var player1Points = 0;
    var player2Points = 0;
    var board = gameItem("#board");
    var ball = gameItem("#ball");
    var leftPaddle = gameItem("#leftPaddle");
    var rightPaddle = gameItem("#rightPaddle");

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
      $(document).on('keydown', handleKeyDown);                          // change 'eventType' to the type of event you want to handle                         
    $(document).on('keyup', handleKeyUp);
    alert("Press the spacebar to start. The up and down arrows control the paddle for player one. The w and s keys control the paddle for player two.");  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    checkPoints();
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
    repositionPaddles();
    repositionBall();
    redrawGameItems();
    updatePoints();

  }
  
  /* 
  Called in response to events.
  */
function handleKeyDown(keydown) {
    if (keydown.which === KEY.SPACE){
        ball.speedX = 3;
        ball.speedY = 3;
    }else if(keydown.which === KEY.UP) {
        leftPaddle.speedY = -15;
        leftPaddle.y += leftPaddle.speedY;
    }else if (keydown.which === KEY.DOWN) {
        leftPaddle.speedY = 15;
        leftPaddle.y += leftPaddle.speedY;
    }else if (keydown.which === KEY.W) {
        rightPaddle.speedY = -15;
        rightPaddle.y += rightPaddle.speedY;
    }else if (keydown.which === KEY.S) {
        rightPaddle.speedY = 15;
        rightPaddle.y += rightPaddle.speedY;
    }         
  }
  function handleKeyUp(keyup) {
    if (keyup.which === KEY.UP) {
        leftPaddle.speedY = 0;
        leftPaddle.y += leftPaddle.speedY;
    }else if (keyup.which === KEY.DOWN) {
        leftPaddle.speedY = 0;
        leftPaddle.y += leftPaddle.speedY;
    }else if (keyup.which === KEY.W) {
        rightPaddle.speedY = 0;
        rightPaddle.y += rightPaddle.speedY;
    }else if (keyup.which === KEY.S) {
        rightPaddle.speedY = 0;
        rightPaddle.y += rightPaddle.speedY;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    if (player1Points >= maxPoints){
        alert("Player 1 dominates");
    }else{
        alert("Player 2 destroyed you");
    }
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function gameItem($elementId){
    var gameObject = {};
    gameObject.id = $elementId;
    gameObject.x = Number($($elementId).css('left').replace(/[^-\d\.]/g, ''));
    gameObject.y = Number($($elementId).css('top').replace(/[^-\d\.]/g, ''));
    gameObject.width = $($elementId).width();
    gameObject.height = $($elementId).height();
    gameObject.speedX = 0;
    gameObject.speedY = 0;
    return gameObject;
  }

  function checkPoints(){
    if (player1Points >= maxPoints || player2Points >= maxPoints){
        endGame();
    }
   }

  function updatePoints(){
    $("h2.score1").text('Player 1: ' + player1Points);
    $("h2.score2").text('Player 2: ' + player2Points);
  }

  function repositionPaddles(){
    if (leftPaddle.y < 0){
        leftPaddle.y = 0;
    }
    if (rightPaddle.y < 0){
        rightPaddle.y = 0;
    }
    if (leftPaddle.y + leftPaddle.height > board.height){
        leftPaddle.y = board.height - leftPaddle.height;
    }
    if (rightPaddle.y + rightPaddle.height > board.height){
        rightPaddle.y = board.height - rightPaddle.height;
    }
}

  function repositionBall(){
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y <= 0){
        ball.speedY = -ball.speedY;
    }
    if (ball.y >= board.height - ball.height ){
        ball.speedY = -ball.speedY
    }
    if(ball.x <= 0){
        player2Points += 1;
        ball.x = board.width / 2;
        ball.y = ball.height / 2;
        ball.speedX = 2;
        }
    if(ball.x + ball.width >= board.width){
        player1Points += 1;
        ball.x = (board.width + ball.width) / 2;
        ball.y = (ball.height +board.height) / 2;
        ball.speedX = -2; 
    }
}

  function redrawGameItems(){
    if (leftPaddle.y < 0){
        leftPaddle.y = 0;
    }
    if (rightPaddle.y < 0){
        rightPaddle.y = 0;
    }
    if (leftPaddle.y + leftPaddle.height > board.height){
       leftPaddle.y = board.height - leftPaddle.height;
    }
    if (rightPaddle.y + rightPaddle.height > board.height){
        rightPaddle.y = board.height - rightPaddle.height;
    }
  $("#leftPaddle").css("left", leftPaddle.x);    // draw the box in the new location, positionX pixels away from the "left"
  $("#leftPaddle").css("top", leftPaddle.y);    // draw the box in the new location, positionY pixels away from the "top"
  $("#rightPaddle").css("left", rightPaddle.x);    // draw the box in the new location, positionX pixels away from the "left"
  $("#rightPaddle").css("top", rightPaddle.y);    // draw the box in the new location, positionY pixels away from the "top"
  $("#ball").css("left", ball.x);    // draw the box in the new location, positionX pixels away from the "left"
  $("#ball").css("top", ball.y);    // draw the box in the new location, positionY pixels away from the "top"
  }
  function doCollide(obj1, obj2) {
    // sides of the obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.bottomY = obj1.y + obj1.height;
    obj1.rightX = obj1.x + obj1.width;
    // sides of obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.bottomY = obj2.y + obj2.height;
    obj2.rightX = obj2.x + obj2.width;
    // TODO: Return true if they are overlapping, false otherwise
    if ((obj1.rightX > obj2.leftX) && (obj1.leftX < obj2.rightX) && (obj1.topY < obj2.bottomY) && (obj1.bottomY > obj2.topY)){
       ball.speedX *= -1.5;
    } 
        
  }
  
}
