/*    JavaScript 7th Edition
      Chapter 2
      Project 02-04

      Application to calculate the cost of a restaurant order plus tax
      Author: Austin Lennert
      Date:  8/29/2022 

      Filename: project02-04.js
*/


const CHICKEN_PRICE = 10.95;
const HALIBUT_PRICE = 13.95;
const BURGER_PRICE  = 9.95;
const SALMON_PRICE  = 18.95;
const SALAD_PRICE   = 7.95;
const SALES_TAX     = 0.07;



// Function to display a numeric value as a text string in the format $##.## 
function formatCurrency(value) {
   return "$" + value.toFixed(2);
}


document.getElementById("chicken").onchange = calcTotal;
document.getElementById("halibut").onchange = calcTotal;
document.getElementById("burger").onchange = calcTotal;
document.getElementById("salmon").onchange = calcTotal;
document.getElementById("salad").onchange = calcTotal;

calcTotal();

function calcTotal() {
   let cost = 0;

   let chickenPurchased = document.getElementById("chicken").checked;
   let halibutPurchased = document.getElementById("halibut").checked;
   let burgerPurchased  = document.getElementById("burger").checked;
   let salmonPurchased  = document.getElementById("salmon").checked;
   let saladPurchased   = document.getElementById("salad").checked;

   cost += (chickenPurchased ? CHICKEN_PRICE : 0);
   cost += (halibutPurchased ? HALIBUT_PRICE : 0);
   cost += (burgerPurchased  ? BURGER_PRICE  : 0);
   cost += (salmonPurchased  ? SALMON_PRICE  : 0);
   cost += (saladPurchased   ? SALAD_PRICE   : 0);


   let tax = cost * SALES_TAX;
   let totalCost = cost + tax;

   document.getElementById("foodTotal").innerText = formatCurrency(cost);
   document.getElementById("foodTax").innerText = formatCurrency(tax);
   document.getElementById("totalBill").innerText = formatCurrency(totalCost);
}