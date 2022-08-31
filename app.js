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
  Mamal.call(img, weight, diet);

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
    return `It looks that ${this.species} is heavier than you!`;
  } else if (this.weight < humanWeight) {
    return `It looks that ${this.species} is lighter than you!`;
  } else {
    return `Wow you both have the same weight!`;
  }
};

//Adding Dino comparing functions2
Dino.prototype.compareHeight = function (humanHeight) {
  if (this.height > humanHeight) {
    return `It looks that ${this.species} is taller than you!`;
  } else if (this.height < humanHeight) {
    return `It looks that ${this.species} is shorter than you!`;
  } else {
    return `Wow you both have the same height!`;
  }
};

//Adding Dino comparing functions3
Dino.prototype.compareDiet = function (humanDiet) {
  if (this.diet === humanDiet) {
    return `Wow you both eat ${this.diet}!`;
  } else {
    return `Looks like ${this.species} eats ${this.diet} and you eat ${humanDiet}!`;
  }
};

/**
 * Creating human constructor using the properties used in html form
 * we also add image property, but this will be fixed not passed as param
 */
function Human(name, feet, inches, img, weight, diet) {
  Mamal.call(img, weight, diet);

  //setting the properties
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  //Short circuit image to a default
  this.img = img || "./images/human.png";
}
Human.prototype = Object.create(Mamal);
Human.prototype.constructor = Human;

//Adding human methods to its prototype
Human.prototype.getHeght = function () {
  //Assuming that the heights provided for dino in dino.json is in inches, we will need to get human total height in same unit
  return this.feet * 12 + this.inches;
};

// Create Dino Objects

// Create Human Object
// This IIFE will return a function when called it will create a human object
const human = (function () {
  return function () {
    const formElements = document.querySelector("#dino-compare").elements;
    const humanProperties = {};
    //Filling the humanProperties object with values from the form
    for (let i = 0; i < formElements.length; i++) {
      //The element will contains the attribute name and value
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

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array
/**
 * This function create tiles either for human, dino or bird
 */
const tile = function (species, img, fact) {};

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
//Setting on click listener on btn
const btn = document.querySelector("#btn");
btn.addEventListener("click", (e) => {
  //Reading
});
