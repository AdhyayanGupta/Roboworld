// CREATING VARIABLES;
var robo, roboIdle, Running, roboShooting;
var backGround, backGroundImg;
var ground, groundImg;
var bullet, bulletImg, bulletGroup;
var zombiGroup, female, male;
var zombikilled;
var wall;
var inwall;
var INTRO = 0
var PLAY = 1;
var END = 2;
var gameState = INTRO;

function preload() {

  // LOADIND ALL ANINAMITIONS AND IMAGES;
  Running = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png");


  backGroundImg = loadImage("BG.png");

  bulletImg = loadImage("injection.png");

  male = loadImage("male.png");
  female = loadImage("female.png");

}

function setup() {
  createCanvas(800, 400);


 backGround = createSprite(300, 300, 600, 600);
    backGround.addImage("adding backGround", backGroundImg);
  
   robo = createSprite(60, 250, 20, 20);

    robo.addAnimation("Running", Running);
   ground = createSprite(400, 390, 800, 20)
    ground.visible = false;
    robo.scale = 0.17;

  zombiKilled = 0;
  
  zombiGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  background(220);

  if (gameState === INTRO) {
    background(10);
    textSize(20);
    stroke("gold");
    text("👾👾 WELCOME TO THE WORLD OF ZOMBIES AND ROBOS 👾👾", 100, 30);
    text("HOW TO PLAY?", 100, 70);
    text("-- USE 'ARROW KEY' TO FLY AND PRESS 'ENTER' TO SHOOT BULLETS.", 40, 110);
    text("-- DONT LET THE ZOMBIES TO TOUCH U OR THE WALL BEHIND U.", 40, 140);
    text("-- IF THE ZOMBIES MANAGE TO TOUCH THE WALL BEHIND U OR U,", 40, 170);
    text("THEN THE GAME IS OVER.",60,200)
    text("TO PLAY THE GAME PRESS SPACE", 250, 270);
    text("BEST OF LUCK ...........👍", 270, 300);
    text("👍👍👍👍👍👍👍👍👍👍👍👍👍👍",270,330);

    
  }

if (keyDown("space") && gameState === INTRO) {
      gameState = PLAY;
    }



  if (gameState === PLAY) {

    
    inwall = createSprite(400,0,800,20)
    inwall.visible = false;
    
    robo.bounceOff(inwall);


    // CREATING BACKGROUND
   
   // backGround.x = width / 2;
    backGround.velocityX = -6 ;
    
    

    if (backGround.x < 0) {
      backGround.x = backGround.width / 2;
    }

    // CREATING ROBO SPRITE
   
   // robo.velocityX= 10;

    // CREATING THE GROUND
   
wall = createSprite(10,200,20,400)
    wall.visible = false;
    
    
    robo.collide(ground);


    if (keyDown(UP_ARROW)) {
      robo.y = robo.y - 10;
    }
    
    if (keyDown(DOWN_ARROW)) {
      robo.y = robo.y + 10;
    }
    
    //robo.velocityY = robo.velocityY + 0.8;

    spawnBullet();
    spawnZombi();
    
    

    
  
  
  if(robo.isTouching(zombiGroup)){
    
       gameState = END;
       }
    
  if(zombiGroup.isTouching(wall)){
       gameState = END;
       }
    
   drawSprites();
    
    fill("gold");
  stroke ("gold")
  textSize(25)
  
  text("ZOMBI👽KILLED👽: " + zombiKilled,20,25);
    if(bulletGroup.isTouching(zombiGroup)){
  zombiGroup.destroyEach();
  zombiKilled ++;
 
}
}
  if (gameState === END){
  
    background(0);
    
    
    
    zombiGroup.destroyEach();
    
    
    //robo.velocityY = 0;
    
    //robo.destroy();
    
    zombiGroup.setVelocityEach(0);
    zombiGroup.setLifetimeEach(-1);
    
    backGround.velocityX = 0;
    
    textSize(20);
    stroke ("black");
    fill("gold");
    text("WELL DONE............",270,180);
    
    text("PLAY AGAIN PRESS 'SPACE'",250,240);
    
    text("YOUR FINAL SCORE = "+zombiKilled,250,300);
    
    
    
     
}
  if(keyDown("space") && gameState === END){
    zombiKilled = 0;
      gameState = INTRO;
    }
    
  

}

function spawnBullet() {
  if (keyDown("enter")) {
    bullet = createSprite(105, robo.y, 10, 10);
    bullet.addImage("adingbullet", bulletImg);
    bullet.scale = 0.095;
    bullet.velocityX = 4;
    bullet.lifetime = 170;

    bulletGroup.add(bullet);
  }
}

function spawnZombi() {
  if (frameCount % 60 === 0) {
    var zombi = createSprite(800, Math.round(random(60, 360)), 10, 40);
    zombi.velocityX = -(6*zombiKilled/4);

    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        zombi.addImage(male);
        break;
      case 2:
        zombi.addImage(female);
        break;

      default:
        break;
    }
    zombi.scale = 0.17;
    zombi.velocityX = -10;
    zombi.lifetime = 160;

    zombiGroup.add(zombi);

  }
}