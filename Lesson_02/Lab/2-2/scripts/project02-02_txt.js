/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Austin Lennert
      Date:   8/29/2022

      Filename: project02-02.js
 */

let nameInput  = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
 
function verifyForm() {
      if (!(nameInput.value && emailInput.value && String(phoneInput.value))) {
            window.alert("Please fill in all fields!");
            return;
      }
      
      let mailRegex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
      if (!emailInput.value.match(mailRegex)) {
            window.alert("Please enter a valid e-mail");
            return
      }

      let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;
      if (!phoneInput.value.match(phoneRegex)) {
            window.alert("Please enter a valid phone number");
            return
      }
      
      window.alert("Thank you");
}

document.getElementById("submit").onclick = verifyForm;