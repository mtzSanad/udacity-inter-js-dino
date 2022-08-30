/**
 * We will be using the properties found in dino.js to create the constructor function
 * We will also add the image to the constructor
 * We can use class keyword here, but I prefered to stick to what I learned from the material
 **/
function Dino(species, weight, height, diet, where, when, fact, img) {
  //Setting the properties
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.img = img;
  // When this function is invoked using new keyword, this function will return a new object with the a/m properties
}

/**
 * Creating human constructor using the properties used in html form
 * we also add image property, but this will be fixed not passed as param
 */
function Human(name, feet, inches, weight, diet) {
  //setting the properties
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
  this.img = "./images/human.png";
}

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
