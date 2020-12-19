//Create variables here
var dog, happyDog, database, foodS, foodStock;
var feedDog, addFoods;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  foodObj=new Food()
  dog = createSprite(250,300,150,150);
  dog.addImage(dog_img);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46, 139, 87);
foodObj.display();

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})
  //add styles here
  fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("Last Feed : "+lastFed%12 + " PM", 350, 30);
        }else if(lastFed==0){
            text("Last Feed : 12 AM", 350, 30); 
        }else{
            text("Last Feed : "+lastFed + " AM", 350, 30);
        }
   


drawSprites();

}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
  }
function feedDog(){
  dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}






