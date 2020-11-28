
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var ground;
var gameState = "play"
var feedDog, feed, addFood
var fedTime, lastFed;
var foodObj;


function preload()
{
  dogImg = loadAnimation("dogImg.png")
  happyDogImg = loadAnimation("dogImg1.png")

}


function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  ground = createSprite(250,480, 500, 40)
  ground.shapeColor = "Gainsboro"

  dog = createSprite(250,400, 100, 100);
  dog.addAnimation("dog", dogImg);
  dog.addAnimation("happydog", happyDogImg)
  dog.scale = 0.25

  foodStock=database.ref('food'); 
  foodStock.on("value",readStock); 

  feed = createButton("Feed the dog")
  feed.position(650,95);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods)

  foodObj = new Food()


}


function draw() {  
  background("skyblue");

  drawSprites();
  if (foodS === 0){
    gameState = "end";
    
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val()
  });

  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+lastFed + " PM", 350,30)
  }else if(lastFed===0){
    text("LastFed : 12 AM", 350, 30);
  }else {
    text("Last Feed : "+lastFed + " AM", 350, 30)
  }

  if(foodS <= 0){
    text("Uh-oh... you don't have any food!", 20, 30 )
    dog.changeAnimation("dog",dogImg)
  }
  
  foodObj.display()

}

function readStock(data){
  foodS = data.val();
  console.log(data.val())
}

function writeStock(x){

  if(x<=0){
    x=0
  }

  else{
    x=x-1
  }


  database.ref('/').update({
    food:x
  })

 
}

function feedDog(){
  if(foodS>0){
    foodS-=1
    dog.changeAnimation("happydog",happyDogImg)
    foodObj.changeFood()
    database.ref('/').update({
      food:foodS,
      FeedTime:hour()
    })
  }

}

function addFoods(){

  foodS++;
  dog.changeAnimation("dog",dogImg)
  foodObj.changeFood()
  database.ref('/').update({
    food:foodS
  })
}
