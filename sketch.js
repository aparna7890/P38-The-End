var monkey, monkeyImg, food, bananaImg
var obstacle, obstacleImg, obstacleGrp, bg, bgImg
var invisibleGround
var score = 0

function preload(){
  bgImg = loadImage ("jungle.jpg")
  
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  bananaImg = loadImage("banana.png")
  obstacleImg = loadImage("stone.png")

}
function setup() {
  createCanvas(500, 200);

  bg = createSprite(0,0, 500, 500)
  bg.addImage(bgImg)
  bg.x = bg.width/2
  //bg.scale = 2
  bg.velocityX = -5
  
  monkey = createSprite(camera.position.x - 170, 150)
  monkey.addAnimation("animal", monkeyImg)
  monkey.scale = 0.1
  
  invisibleGround = createSprite(250, 190, 500, 20)
  
  bananaGrp = createGroup()
  obstacleGrp = createGroup()
}

function draw() {
  background(220);
  monkey.x = camera.position.x - 170
  
  if(bg.x < camera.position.x - 250){
    bg.x = bg.width/2
  }
  
  monkey.collide(invisibleGround)
  invisibleGround.visible = false
  
  //making monkey jump
  if(keyDown("space")){
    monkey.velocityY = -8
  }  //adding gravity
  if(monkey.y<150){
    monkey.velocityY = monkey.velocityY + 0.7
  }
  //scoring
  if(bananaGrp.isTouching(monkey)){
    score = score + 2;
    bananaGrp.destroyEach()
  }
  switch (score) {
    case 30: monkey.scale = 0.12;
      break;
    case 60: monkey.scale = 0.14;
      break;
    case 90: monkey.scale = 0.145;
      break;
    case 120: monkey.scale = 0.15;
      break;
    default: break;
  }
  //ending
  if(obstacleGrp.isTouching(monkey)){
    monkey.scale = 0.1
  }
  spawnBanana()
  spawnObstacle()
  
  drawSprites();
  
  fill("white")
  textSize(15)
  text("Score: "+score, camera.position.x + 130, 40)
}

function spawnBanana (){
  if(frameCount %90 === 0){
    food = createSprite(camera.position.x + 250, random(50, 80))
    food.addImage(bananaImg)
    food.scale = 0.04
    food.velocityX = -8
    bananaGrp.add(food)
  }
  
}
function spawnObstacle (){
  if(frameCount % 200 === 0){
    obstacle = createSprite(camera.position.x + 250, 150)
    obstacle.addImage(obstacleImg)
    obstacle.scale = 0.15
    obstacle.velocityX = -5
    obstacleGrp.add(obstacle)
  }
}
