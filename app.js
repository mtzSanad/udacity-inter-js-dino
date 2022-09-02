//Selecing required elements
const form = document.querySelector("#dino-compare");
const btn = document.querySelector("#btn");
const grid = document.querySelector("#grid");

/**
 * Creating A generic class to be inherted by human and dino
 */
function Mamal(weight, diet, img) {
  this.weight = weight;
  this.diet = diet;
  this.img = img;
}

/**
 * We will be using the properties found in dino.js to create the constructor function
 * We will also add the image to the constructor
 * We can use class keyword here, but I prefered to stick to what I learned from the material
 **/
function Dino(species, height, where, when, fact, img, weight, diet) {
  //Calling the super constructor to set Dino object properties
  Mamal.call(this, weight, diet, img);

  //Setting the properties
  this.species = species;
  this.height = height;
  this.where = where;
  this.when = when;
  this.fact = fact;
  // When this function is invoked using new keyword, this function will return a new object with the a/m properties
}
//Setting the parent class for Dino
Dino.prototype = Object.create(Mamal);
//Since we set dino prototype to mamal, its constructor now is referencing the mamal we need to change it
Dino.prototype.constructor = Dino;

//Adding Dino comparing functions1
Dino.prototype.compareWeight = function (humanWeight) {
  if (this.weight > humanWeight) {
    this.fact = `It looks that ${this.species} is heavier than you!`;
  } else if (this.weight < humanWeight) {
    this.fact = `It looks that ${this.species} is lighter than you!`;
  } else {
    this.fact = `Wow you both have the same weight!`;
  }
};

//Adding Dino comparing functions2
Dino.prototype.compareHeight = function (humanHeight) {
  debugger;
  if (this.height > humanHeight) {
    this.fact = `It looks that ${this.species} is taller than you!`;
  } else if (this.height < humanHeight) {
    this.fact = `It looks that ${this.species} is shorter than you!`;
  } else {
    this.fact = `Wow you both have the same height!`;
  }
};

//Adding Dino comparing functions3
Dino.prototype.compareDiet = function (humanDiet) {
  if (this.diet === humanDiet.toLowerCase()) {
    this.fact = `Wow you both eat ${this.diet}!`;
  } else {
    this.fact = `Looks like ${this.species} eats ${this.diet} and you eat ${humanDiet}!`;
  }
};

/**
 * Creating human constructor using the properties used in html form
 * we also add image property, but this will be fixed not passed as param
 */
function Human(hName, feet, inches, img, weight, diet) {
  Mamal.call(this, weight, diet, img);

  //setting the properties
  this.hName = hName;
  this.feet = feet;
  this.inches = inches;
  //Short circuit image to a default
  this.img = img || "./images/human.png";
}
Human.prototype = Object.create(Mamal);
Human.prototype.constructor = Human;

//Adding human methods to its prototype
Human.prototype.getHeight = function () {
  //Assuming that the heights provided for dino in dino.json is in inches, we will need to get human total height in same unit
  this.height = +this.feet * 12 + +this.inches;
};

// Create Dino Objects

// Create Human Object
// This IIFE will return a function when called it will create a human object
const human = (function () {
  return function () {
    const formElements = form.elements;
    const humanProperties = {};
    //Filling the humanProperties object with values from the form
    for (let i = 0; i < formElements.length; i++) {
      //The element will contains the attribute hName and value
      const element = formElements.item(i);
      //Now fill the object properties with values from element
      humanProperties[element.name] = element.value;
    }

    return new Human(
      humanProperties.name,
      humanProperties.feet,
      humanProperties.inches,
      null,
      humanProperties.weight,
      humanProperties.diet
    );
  };
})();

// Generate Tiles for each Dino in Array
/**
 * This function create tiles either for human, dino or bird
 */
const tile = function (species, img, fact, hName) {
  //Creating a wrapping div
  const tileDiv = document.createElement("div");
  tileDiv.className = "grid-item";

  //Adding heading3 species or named
  const headeing3 = document.createElement("h3");
  headeing3.textContent = species ? species : hName;
  tileDiv.appendChild(headeing3);

  //Adding Image
  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", img);
  imgElement.setAttribute("alt", headeing3.textContent);
  tileDiv.appendChild(imgElement);

  //Adding Fact
  const p = document.createElement("p");
  p.textContent = fact;
  tileDiv.appendChild(p);

  return tileDiv;
};

//Creating Dino objects from json file
let dinoArray = [];
(async function () {
  const response = await fetch("./dino.json");
  const { Dinos } = await response.json();

  dinoArray = Dinos.map((dino) => {
    return new Dino(
      dino.species,
      dino.height,
      dino.where,
      dino.when,
      dino.fact,
      `./images/${dino.species.toLowerCase()}.png`,
      dino.weight,
      dino.diet
    );
  });
})();

// On button click, prepare and display infographic
//Setting on click listener on btn
btn.addEventListener("click", (e) => {
  //Initialize tiles object array
  const tilesArray = [];

  // Remove form from screen
  form.style.display = "none";

  // Gettting the human object from the form
  const humanObject = human();

  //Random changing 3 dino facts with comparing facts
  let shuffleDino = [0, 1, 2, 3, 4, 5, 6].sort(() => 0.5 - Math.random());
  let factsChangingDino = shuffleDino.splice(0, 3);
  let counter = 0;

  dinoArray.forEach((dinoObject, indx) => {
    if (factsChangingDino.includes(indx)) {
      switch (counter) {
        case 0:
          dinoObject.compareDiet(humanObject.diet);
          break;
        case 1:
          //Call method to get the correct human hieght
          debugger;
          humanObject.getHeight();
          dinoObject.compareHeight(humanObject.height);
          break;
        case 2:
          dinoObject.compareWeight(humanObject.weight);
          break;
      }
      counter++;
    }
  });

  //Creating tiles array
  for (let i = 0; i < 9; i++) {
    //Adding human to be in center
    if (i === 4) {
      tilesArray.push(humanObject);
      continue;
    }

    tilesArray.push(dinoArray.shift());
  }

  // Add tiles to DOM
  for (let index in tilesArray) {
    const element = tilesArray[index];
    const tileDiv = tile(
      element.species,
      element.img,
      element.fact,
      element.hName
    );
    grid.appendChild(tileDiv);
  }
});
