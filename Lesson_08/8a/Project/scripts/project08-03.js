"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-03

      Project to build a pizza using object oriented programming
      Author: Austin Lennert
      Date:   10/17/22

      Filename: project08-03.js
*/

/*---------------- Object Code ----------------------*/

let cart = {
   items: [],
   addItem: function(foodItem) { this.items.push(foodItem) }
};


class Pizza {
   constructor() {
      this.size = null;
      this.crust = null;
      this.toppings = [];
   }

   /** Adds this pizza to the shopping cart passed in */
   addToCart(cart) {
      cart.addItem(this);
   }

   /** Adds a topping to the pizza */
   addTopping(topping) {
      this.toppings.push(topping);
   }

   /** Creates a summary description of the pizza */
   summerize() {
      let summary = "Pizza: ";
      summary += `${this.size} ${this.crust}`;

      this.toppings.forEach(topping => {
         summary += `<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`;  // Add spacing
         summary += `${topping.name} (${topping.side})` ;            // Add topping
      });

      return(summary);
   }
}

class Topping {
   constructor() {
      this.name = null;
      this.size = null;
   }
}







/*----------------------------- Interface Code -------------------------*/

let pizzaPreviewBox = document.getElementById("previewBox");         // pizza image 
let pizzaSizeBox = document.getElementById("pizzaSize");             // pizza size selection
let pizzaCrustBox = document.getElementById("pizzaCrust");           // pizza crust selection 
let toppingOptions = document.querySelectorAll("input.topping");     // pizza topping option buttons
let addToCart = document.getElementById("addToCart");                // Add to Cart button
let cartBox = document.getElementById("cart");                       // Shopping cart box


// Add event handlers for the pizza toppings   
for (let i = 0; i < toppingOptions.length; i++) {
   toppingOptions[i].onclick = drawPizza;
} 

// Event Handler for the addToCart button
addToCart.onclick = updateCart;


// Clear the pizza image
function clearPizzaImage() {
   while (pizzaPreviewBox.firstChild) {
      pizzaPreviewBox.removeChild(pizzaPreviewBox.firstChild);
   }
}

// Unselect all toppings
function clearToppings() {
   let noTopping = document.querySelectorAll("input.topping[value='none']");
   for (let i = 0; i < noTopping.length; i++) {
      noTopping[i].checked = true;
   }
}

/* Function to draw the pizza image  */
function drawPizza() {
   // Erase current pizza image
   clearPizzaImage();
   // Determine which toppings have been checked
   let checkedToppings = document.querySelectorAll("input.topping:checked");  

   // Draw the individual toppings
   for (let i = 0; i < checkedToppings.length; i++) {
      if (checkedToppings[i].value !== "none") {
         let toppingImage = document.createElement("img");
         toppingImage.src = "./images/" + checkedToppings[i].name + ".png";
         toppingImage.className = checkedToppings[i].value;
         pizzaPreviewBox.appendChild(toppingImage);                                  
      }
   }      
}



// Function to build the pizza
function buildPizza() {
   let checkedToppings = document.querySelectorAll("input.topping:checked"); 

   let myPizza = new Pizza();
   myPizza.size = pizzaSizeBox.value;
   myPizza.crust = pizzaCrustBox.value;

   checkedToppings.forEach(topping => {
      let myTopping = new Topping();
      myTopping.name = topping.name;
      myTopping.side = topping.value;
      if (topping.value !== "none") { myPizza.addTopping(myTopping); }
   });

   return(myPizza);
}    

/** Function to add the built pizza to the shopping cart */
function updateCart() {
   let myPizza = buildPizza();
   cart.addItem(myPizza);
   console.log(cart);

   let pizzaSummary = document.createElement("p");
   pizzaSummary.innerHTML = myPizza.summerize();

   cartBox.appendChild(pizzaSummary);
}  
