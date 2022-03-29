var bg
var balloon1, balloon2, balloon3
var balloon
var obstacles
var PLAY = 1
var END = 0
var gameState = PLAY

function preload() {
  bg = loadImage("assets/bg.png")
  balloon = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obsBottom1 = loadImage("assets/obsBottom1.png")
  obsBottom2 = loadImage("assets/obsBottom2.png")
  obsBottom3 = loadImage("assets/obsBottom3.png")
  obsTop1 = loadImage("assets/obsTop1.png")
  obsTop2 = loadImage("assets/obsTop2.png")
  restartimg = loadImage("assets/restart.png")
  gameOverimg = loadImage("assets/gameOver.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  airballoon = createSprite(500,500)
  airballoon.addAnimation("balloon",balloon)
  airballoon.scale = 0.4;
  topground = createSprite(200,10,displayWidth,20)
  bottomground = createSprite(200,displayHeight-10,displayWidth,20)
  topground.visible = false
  bottomground.visible = false
  gameOver = createSprite(770,300)
  restart = createSprite(770,500)
  gameOver.addImage(gameOverimg)
  restart.addImage(restartimg)
  gameOver.visible = false
  restart.visible = false
  topobstaclesgroup = new Group()
    bottomobstaclesgroup = new Group()
}
function draw() {
  background(bg);
  
  if(gameState === PLAY){
  if(keyDown("a")){
airballoon.velocityY = -6
  }

  airballoon.velocityY = airballoon.velocityY + 1
  spawnobstaclesTop();
  spawnobstaclesBottom();
    if(topobstaclesgroup.isTouching(airballoon)||bottomobstaclesgroup.isTouching(airballoon)){
  gameState = END
    }
}
  if(gameState === END){
    gameOver.visible = true
    restart.visible = true
    topobstaclesgroup.setVelocityXEach(0)
    bottomobstaclesgroup.setVelocityXEach(0)
    airballoon.velocityX = 0
    airballoon.velocityY = 0

  }
  drawSprites();
}
function spawnobstaclesTop(){
  if (frameCount%150 === 0){
  obstaclesTop = createSprite(displayWidth,400)
  obstaclesTop.velocityX = -2
  obstaclesTop.scale = 0.2
  obstaclesTop.y = Math.round(random(70,250))
  var rand = Math.round(random(1,2))
  switch(rand){
    case 1:obstaclesTop.addImage(obsTop1);
    break;
    case 2:obstaclesTop.addImage(obsTop2);
    break;
    default:break;

  }
  topobstaclesgroup.add(obstaclesTop)
  obstaclesTop.lifetime = displayWidth
}
}
function spawnobstaclesBottom(){
  if (frameCount%150 === 0){
  obstaclesBottom = createSprite(displayWidth,displayHeight - 100)
  obstaclesBottom.velocityX = -2
  obstaclesBottom.scale = 0.2
  var rand = Math.round(random(1,3))
  switch(rand){
    case 1:obstaclesBottom.addImage(obsBottom1);
    break;
    case 2:obstaclesBottom.addImage(obsBottom2);
    break;
    case 3:obstaclesBottom.addImage(obsBottom3);
    break;
    default:break;

  }
  bottomobstaclesgroup.add(obstaclesBottom)
  obstaclesBottom.lifetime = displayWidth
}
}