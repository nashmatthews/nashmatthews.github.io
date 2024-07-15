// $$¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬$$
//=||.@@@@@@...@@...@@@@@..@@....@@.@@....@@...@@...@@@@@..@@@@@......@@@@@@.@@@@@..@@@@@@.@@@@@@.@@....@@.@@@@@...@@@@..||=
//=||.@@@@@@..@@@@..@@..@@.@@@..@@@.@@....@@..@@@@..@@..@@.@@..@@.....@@@@@@.@@..@@...@@...@@.....@@@...@@.@@..@@.@@..@@.||=
//=||.@@.....@@..@@.@@..@@.@@.@@.@@..@@..@@..@@..@@.@@..@@.@@..@@.....@@.....@@..@@...@@...@@.....@@@@..@@.@@..@@.@@.....||=
//=||.@@@@...@@@@@@.@@@@@..@@....@@...@@@@...@@@@@@.@@@@@..@@..@@.....@@@@...@@@@@....@@...@@@@...@@.@@.@@.@@..@@..@@@@..||=
//=||.@@.....@@..@@.@@.@@..@@....@@....@@....@@..@@.@@.@@..@@..@@.....@@.....@@.@@....@@...@@.....@@..@@@@.@@..@@.....@@.||=
//=||.@@.....@@..@@.@@..@@.@@....@@....@@....@@..@@.@@..@@.@@..@@.....@@.....@@..@@...@@...@@.....@@...@@@.@@..@@.@@..@@.||=
//=||.@@.....@@..@@.@@..@@.@@....@@....@@....@@..@@.@@..@@.@@@@@......@@.....@@..@@.@@@@@@.@@@@@@.@@....@@.@@@@@...@@@@..||=
// $$¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬$$

/* UPDATE!!!

Game seems to be running fine now.

We took the random numbers out to make it simpler to figure out the niggles but I've switched them back to random and they're working.

*/

// link to HTML elements

const placeholder = document.getElementById("placeholder");
const stats = document.getElementById("stats");
const input = document.getElementById("input");
const submit = document.getElementById("name");
const sheep = document.getElementById("sheep");
const horse = document.getElementById("horse");
const start = document.getElementById("start");
const list = document.getElementById("list");
const feed = document.getElementById("feed");
const play = document.getElementById("play");
const sleep = document.getElementById("sleep"); 
const shear = document.getElementById("shear");
const change = document.getElementById("change");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");
const gameovertheme = document.getElementById("gameover");
const imghorse = document.getElementById("horsePic");
const imgsheep = document.getElementById("sheepPic");

function maintheme() {
  music1.volume = 0.08;
  music1.play();
}

function gametheme() {
  music2.volume = 0.4;
  music2.play();
  music1.pause();
}

function gameover() {
  music2.pause();
  gameovertheme.volume = 0.2;
  gameovertheme.play();
}

// declare initial BasePet class

class BasePet {
    constructor(name, animal, hunger, fatigue, happiness, stillAlive) {
      this.name = name;
      this.animal = animal
      this.hunger = hunger;
      this.fatigue = fatigue;
      this.happiness = happiness;
      this.stillAlive = stillAlive;
    }
};

// set the extended class constructor for Sheep class

class Sheep extends BasePet {
    constructor(name, animal, hunger, fatigue, happiness, stillAlive, woolLength) {
      super(name, animal, hunger, fatigue, happiness, stillAlive);
      this.woolLength = woolLength;
    }
    checkIfAliveSheep() {
      if (this.woolLength >= 100 || this.hunger >= 100 || this.fatigue >= 100 || this.happiness <= 0){
        this.stillAlive = false;
      }
    }
  }
    
  const petSheep = new Sheep("", "Sheep", 50, 50, 50, true, 50);

// set the extended class constructor for Horse class

class Horse extends BasePet {
    constructor(name, animal, hunger, fatigue, happiness, stillAlive, horseShoeHealth) {
      super(name, animal, hunger, fatigue, happiness, stillAlive);
      this.horseShoeHealth = horseShoeHealth;
    }

    checkIfAliveHorse () {
      if (this.horseShoeHealth <= 0 || this.hunger >= 100 || this.fatigue >= 100 || this.happiness <= 0){
        this.stillAlive = false;
      }
    }
  }

  const petHorse = new Horse("", "Horse", 50, 50, 50, true, 50);

// declare necessary variables for later in the code

let animals;
let intervalTimerIndividual;

// hide all animal selection and action buttons

sheep.style.display = "none";
horse.style.display = "none";
start.style.display = "none";
feed.style.display = "none";
sleep.style.display = "none";
play.style.display = "none";
shear.style.display = "none";
change.style.display = "none";

// STEP 1 - Input pet's name and click 'Submit'

submit.addEventListener("click", () =>{
    maintheme();
    petName = input.value;
    placeholder.textContent = `Your pet's name is ${petName}! What a fantastic name! Now, is ${petName} a sheep or a horse? Those are you options`;
    submit.style.display = "none";
    input.style.display = "none";
    sheep.style.display = "block";
    horse.style.display = "block";
    new BasePet(petName, "", 50, 50, 50, true);
});

/* STEP 2 - Pick whether your pet is a sheep or a horse
        sheepish/horseish functions declare the value of the 'animals' variable
        these functions are called when the corresponding button is clicked
*/

const sheepish = () => {
  animals = "Sheep";
}
const horseish = () => {
  animals = "Horse";
}

sheep.addEventListener("click", () =>{
    placeholder.textContent = `${petName} the sheep!? Baaa-utiful!`;
    start.style.display = "block";
    sheep.style.display = "none";
    horse.style.display = "none";
    sheepish();
    imghorse.style.display = "none";
});

/* a new 'Horse' class is declared using the class extender... I THINK???
*/

horse.addEventListener("click", () =>{
    placeholder.textContent = `Is ${petName} a sheep? Neigh, it's a horse!!!`;
    start.style.display = "block";
    sheep.style.display = "none";
    horse.style.display = "none";  
    horseish();
    imgsheep.style.display = "none";
});

/* STEP 3 - Click 'Start Game' button

if animal is sheep then the 'Shear' button appears; if horse then the 'Change Shoes' button appears
different loop starts depending on the animal
*/

start.addEventListener("click", () =>{
  feed.style.display = "block";
  sleep.style.display = "block";
  play.style.display = "block";
  placeholder.style.display = "none";
  start.style.display = "none";
  gametheme()

  if (animals == "Sheep"){
    shear.style.display = "block";
    gameLoopSheep();
    // intervalTimerIndividual = setInterval(gameLoopSheep(), 1000);
  }  
  else if (animals == "Horse"){
    change.style.display = "block";
    gameLoopHorse();
    // intervalTimerIndividual = setInterval(gameLoopHorse(), 2000);
  }
})

/* These two functions are run by the game loop function below them
          render function to display stats
          timing function to add/subtract from stat levels, check if the pet is still alive, then run the game loop function again
*/

const renderSheep = () => {
  stats.textContent = `${petName}'s hunger level is: ${petSheep.hunger} - - 
                        ${petName}'s fatigue level is: ${petSheep.fatigue} - - 
                        ${petName}'s happiness level is: ${petSheep.happiness} - - 
                        ${petName}'s wool length is: ${petSheep.woolLength}`
}

const timingFunctionSheep = () => {
  window.setTimeout(() => {
    // petSheep.hunger += 5
    // petSheep.fatigue += 5
    // petSheep.happiness -= 5
    // petSheep.woolLength += 5
    petSheep.hunger += Math.floor(Math.random()*10)+3
    petSheep.fatigue += Math.floor(Math.random()*10)+3
    petSheep.happiness -= Math.floor(Math.random()*10)+3
    petSheep.woolLength += Math.floor(Math.random()*10)+3
    
    gameLoopSheep();
  }, 2000)
}

/* Game loop function
          if sheep is still alive it runs render function, then timing function (see above)
          if sheep is dead it returns a different game over message depending on how the sheep died
*/

const gameLoopSheep = () => {
  
  if (petSheep.stillAlive == true){
    petSheep.checkIfAliveSheep();
    renderSheep()  
    timingFunctionSheep()
    
    // console.log(`${petName}'s hunger level is: ${petSheep.hunger}`);
    // console.log(`${petName}'s fatigue level is: ${petSheep.fatigue}`);
    // console.log(`${petName}'s happiness level is: ${petSheep.happiness}`);
    // console.log(`${petName}'s wool length is: ${petSheep.woolLength} units`);
    
  }
  else if (petSheep.stillAlive == false){
    gameover();
    // console.log(`GAME OVER! You idiot! ${petName} is dead and it's all your fault.`)
    if (petSheep.hunger >= 100){
      window.alert(`GAME OVER! ${petName} didn't get enough food and they have starved to death!`)
    }
    else if (petSheep.fatigue >= 100){
      window.alert(`GAME OVER! ${petName} is just too tired to go on.`)
    }
    else if (petSheep.happiness <= 0){
      window.alert(`GAME OVER! ${petName}'s emotional needs have been neglected by you, and as a result, they have been crushed under the weight of their own sadness`)
    }
    else if (petSheep.woolLength >= 100){
      window.alert(`GAME OVER! ${petName} has been suffocated by their overgrown wool!`)
    }
    // window.alert(`GAME OVER! You idiot! ${petName} is dead and it's all your fault.`)
    clearInterval(intervalTimerIndividual)
  }
}

// same as above but for horse

const renderHorse = () => {
  stats.textContent = `${petName}'s hunger level is: ${petHorse.hunger}  - -  
                        ${petName}'s fatigue level is: ${petHorse.fatigue}  - -  
                        ${petName}'s happiness level is: ${petHorse.happiness}  - -  
                        ${petName}'s horse shoe health level is: ${petHorse.horseShoeHealth}`
}

const timingFunctionHorse = () => {
  window.setTimeout(() => {
    // petHorse.hunger += 5
    // petHorse.fatigue += 5
    // petHorse.happiness -= 5
    // petHorse.horseShoeHealth -= 5
    petHorse.hunger += Math.floor(Math.random()*10)+3
    petHorse.fatigue += Math.floor(Math.random()*10)+3
    petHorse.happiness -= Math.floor(Math.random()*10)+3
    petHorse.horseShoeHealth -= Math.floor(Math.random()*10)+3
    
    gameLoopHorse();
  }, 3000)
}
const gameLoopHorse = () => {
  if (petHorse.stillAlive == true){
    petHorse.checkIfAliveHorse();
    renderHorse();
    timingFunctionHorse();

      // console.log(`${petName}'s hunger level is: ${petHorse.hunger}`);
      // console.log(`${petName}'s fatigue level is: ${petHorse.fatigue}`);
      // console.log(`${petName}'s happiness level is: ${petHorse.happiness}`);
      // console.log(`${petName}'s horse shoe health level is: ${petHorse.horseShoeHealth}`);
  
  }
  else if (petHorse.stillAlive == false){
    gameover();
    if (petHorse.hunger >= 100) {
      window.alert(`GAME OVER! You didn't feed ${petName} enough and they died. Nice one.`);
    }
    else if (petHorse.fatigue >= 100) {
      window.alert(`GAME OVER! ${petName} is so knackered that they've keeled over and died.`);
    }
    else if (petHorse.happiness <= 0) {
      window.alert(`GAME OVER! ${petName} is a sad horse. At least, they would be if they hadn't just died of sadness. I hope you're pleased with yourself.`);
    }
    else if (petHorse.horseShoeHealth <= 0) {
      window.alert(`GAME OVER! You didn't change ${petName}'s shoes and their feet got infected. The infection spread through their body and they died in agony.`)
    }
    // console.log("GAME OVER! Pet horse is dead!")1
    // window.alert("GAME OVER! Your pet is dead!")
    clearInterval(intervalTimerIndividual)
  }
}

/* Action buttons for the game
  feed, play and sleep buttons affect different classes (Sheep, Horse) depending on the animal selected (if/else statement)
  if 'Feed', 'Sleep' or 'Shear' buttons are clicked, hunger, fatigue or woolLength decrease by random amount between five and fifteen
  if 'Play' or 'Change Horse Shoes' buttons are clicked, happiness or horse shoe health increases by random amount between five and fifteen
  when each button is clicked it is disabled for a random amount of time, up to five seconds
*/

feed.addEventListener('click', () => {
  if (animals == "Sheep"){
    // petSheep.hunger -= 30;
    petSheep.hunger -= Math.floor(Math.random()*10)+5;
  }
  else if (animals == "Horse"){
    // petHorse.hunger -= 30;
    petHorse.hunger -= Math.floor(Math.random()*10)+5;
  };

  // const reloadTime = 3;
  const reloadTime = Math.floor(Math.random() * 5) + 1;


  feed.disabled = true;

  setTimeout(() => {
    feed.disabled = false;
  }, reloadTime * 1000);
});


play.addEventListener('click', () => {
    if (animals == "Sheep"){
      // petSheep.happiness += 20
      petSheep.happiness += Math.floor(Math.random()*10)+5;
    }
    else if (animals == "Horse"){
      // petHorse.happiness += 20
      petHorse.happiness += Math.floor(Math.random()*10)+5;
    };
  
    // const reloadTime = 2
    const reloadTime = Math.floor(Math.random() * 5) + 1;
  
    play.disabled = true;
  
    setTimeout(() => {
      play.disabled = false;
    }, reloadTime * 1000);
  });


sleep.addEventListener('click', () => {
    if (animals == "Sheep"){
      // petSheep.fatigue -= 2;
      petSheep.fatigue -= Math.floor(Math.random()*10)+5;
    }
    else if (animals == "Horse"){
      // petHorse.fatigue -= 2;
      petHorse.fatigue -= Math.floor(Math.random()*10)+5;
    };
  
    // const reloadTime = 2;
    const reloadTime = Math.floor(Math.random() * 5) + 1;
  
    sleep.disabled = true;
  
    setTimeout(() => {
      sleep.disabled = false;
    }, reloadTime * 1000);
  });


shear.addEventListener('click', () => {
    // petSheep.woolLength -= 3;
    petSheep.woolLength -= Math.floor(Math.random() * 10) + 5;
  
    // const reloadTime = 3;
    const reloadTime = Math.floor(Math.random() * 5) + 1;
  
    shear.disabled = true;
  
    setTimeout(() => {
      shear.disabled = false;
    }, reloadTime * 1000);
});


  change.addEventListener('click', () => {
    // petHorse.horseShoeHealth += 3;
    petHorse.horseShoeHealth += Math.floor(Math.random()*10)+5;

    // const reloadTime = 3;
    const reloadTime = Math.floor(Math.random() * 5) + 1;
  
    change.disabled = true;
  
    setTimeout(() => {
      change.disabled = false;
    }, reloadTime * 1000);
  });