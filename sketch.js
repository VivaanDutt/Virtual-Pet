var dog,sadDog,happyDog;
var feedPet, addFood;
var database;
var foodObj;
var foodS = 0;
var lastFed = 0;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  foodObj = new Food();
  feedPet = createButton("Feed the Dog");
  feedPet.position(700, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >=12) {
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
  } else if (lastFed === 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  drawSprites();
}

//function to read food Stock
function readStock() {
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);
  if (foodObj.getFoodStock() <= 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
  } else {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
