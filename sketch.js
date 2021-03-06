var towerImg, tower

var doorImg, door, doorGrp

var climberImg, climber, climberGrp

var ghost, ghostImg

var invisibleBlock, invisibleBlockGrp

var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png")
  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");

  
}

function setup(){
  createCanvas(600,600);
  
  //spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1
  
  ghost = createSprite(200,200,50,50)
  ghost.scale = 0.3
  ghost.addImage("ghost", ghostImg)
  
  invisibleBlockGrp = new Group();
  doorGrp = new Group();
  climberGrp = new Group();
}

function draw(){
  background(0)
  if (gameState === "play"){
    
  
  if(tower.y> 400){
    tower.y = 300
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
    if(keyDown("right_arrow")){
    ghost.x = ghost.x+3
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY+.8
  
  if(climberGrp.isTouching(ghost)){
    ghost.velocityY = 0
  }
  
  
  spawnDoors();
  }
  if(invisibleBlockGrp.isTouching(ghost) || ghost.y >600){
    ghost.destroy();
    gameState = "end"
    
  }
  drawSprites();
  if(gameState === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("gameOver", 230,250);
    tower.velocityY = 0
    doorGrp.setvelocityYEach(0)
    climberGrp.setvelocityYEach(0)
  }
}

function spawnDoors(){
  if (frameCount%240 === 0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    invisibleBlock =createSprite(200,15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    climber.addImage(climberImg);
    door.addImage(doorImg)
    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x
    door.velocityY = 1
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
    //invisibleBlock.debug = true
    invisibleBlock.velocityY = 1
    climber.velocityY = 1
    doorGrp.add(door);
    climberGrp.add(climber)
    invisibleBlockGrp.add(invisibleBlock);
    invisibleBlockGrp.visible = false
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    
  }
}