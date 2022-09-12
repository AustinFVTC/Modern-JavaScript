"use strict";

/*    JavaScript 7th Edition
      Chapter 4
      Project 04-04

      Application to determine change from a cash amount
      Author: Austin Lennert
      Date:   9/12/22

      Filename: project04-04.js
*/

// Global variables
let cashBox = document.getElementById("cash");
let billBox = document.getElementById("bill");
let changeBox = document.getElementById("change");

// Event handlers to be run when the cash or bill value changes
cashBox.addEventListener("change", runTheRegister);
billBox.addEventListener("change", runTheRegister);

// Function to reset the values in the web page
function zeroTheRegister() {
   changeBox.value = 0;
   document.getElementById("bill20").innerHTML = 0;
   document.getElementById("bill10").innerHTML = 0;
   document.getElementById("bill5").innerHTML = 0;
   document.getElementById("bill1").innerHTML = 0;
   document.getElementById("coin25").innerHTML = 0;
   document.getElementById("coin10").innerHTML = 0;
   document.getElementById("coin5").innerHTML = 0;
   document.getElementById("coin1").innerHTML = 0;
   document.getElementById("warning").innerHTML = "";
}

// Function to run the cash register
function runTheRegister() {
   zeroTheRegister();
   
   let changeValue = cashBox.value - billBox.value;  // calculate the change 
   try {
      if (!(changeValue >= 0)) throw("Cash amount doesn't cover the bill");

      changeBox.value = formatCurrency(changeValue); // format the change as currency
      // Uses pennies, not dollars, to avoid floating point errors
      calcChange(changeValue*100); // Determine the units of currency needed for the change
     } catch(err) {
      document.getElementById("warning").innerHTML = err;
   }
 }

// Function to calculate the change by each unit of currency
function calcChange(changeValue) {
   // Determine the number of $20 bills
   let bill20Amt = determineCoin(changeValue, 2000);  // Uses pennies, not dollars, to avoid floating point errors
   document.getElementById("bill20").innerHTML = bill20Amt;
   changeValue -=  bill20Amt*2000;

   // Determine the number of $10 bills   
   let bill10Amt = determineCoin(changeValue, 1000);
   document.getElementById("bill10").innerHTML = bill10Amt;
   changeValue -=  bill10Amt*1000;
   
   // Determine the number of $5 bills
   let bill5Amt = determineCoin(changeValue, 500);
   document.getElementById("bill5").innerHTML = bill5Amt;
   changeValue -=  bill5Amt*500;  
   
   // Determine the number of $1 bills
   let bill1Amt = determineCoin(changeValue, 100);
   document.getElementById("bill1").innerHTML = bill1Amt;
   changeValue -=  bill1Amt*100;  
   
   // Determine the number of quarters
   let coin25Amt = determineCoin(changeValue, 25);
   document.getElementById("coin25").innerHTML = coin25Amt;
   changeValue -= coin25Amt*25;   
   
   // Determine the number of dimes
   let coin10Amt = determineCoin(changeValue, 10);
   document.getElementById("coin10").innerHTML = coin10Amt;
   changeValue -= coin10Amt*10; 
   
   // Determine the number of nickels
   let coin5Amt = determineCoin(changeValue, 5);
   document.getElementById("coin5").innerHTML = coin5Amt;
   changeValue -= coin5Amt*5;  
   
   // Determine the number of pennies
   // The Math.round() method rounds the value to the nearest integer
   let coin1Amt = Math.round(changeValue);
   document.getElementById("coin1").innerHTML = coin1Amt;
}








/* ================================================================= */

// Function to determine the largest whole number of currency units that 
// can fit within the cash value
function determineCoin(cashValue, currencyUnit) {
   // The parseInt() function returns the integer value of the ratio
   return parseInt(cashValue/currencyUnit);
}

 // Function to display a numeric value as a text string in the format ##.## 
 function formatCurrency(value) {
    return value.toFixed(2);
 }