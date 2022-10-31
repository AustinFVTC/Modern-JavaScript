"use strict";
/*  JavaScript 7th Edition
    Chapter 9
    Chapter case
      
    Eating Well in Season 
    Author: Austin Lennert
    Date:   10/31/22
      
    Filename: js09b.js
*/

// Retrieve the text of the query string
let qString = location.search.slice(1);

// Replace the encoded characters in the query string
qString = qString.replace(/\+/g, " ");
qString = decodeURIComponent(qString);

// Split the field=name pairs into separate array items
let formData = qString.split(/&/g);

for (let items of formData) {
    let fieldValuePair = items.split(/=/);
    let fieldName = fieldValuePair[0];
    let fieldValue = fieldValuePair[1];

    // Create a label containing the field name
    let fieldLabel = document.createElement("label");
    fieldLabel.textContent = fieldName;
    document.getElementById("contactInfo").appendChild(fieldLabel);

    // Create a disable input box with the field value
    let inputBox = document.createElement("input");
    inputBox.id = fieldName;
    inputBox.name = fieldName;
    inputBox.value = fieldValue;
    inputBox.disabled = true;
    
    document.getElementById("contactInfo").appendChild(inputBox);
}

// Store data to local storage when the user signs up
document.getElementById("signupBtn").onclick = function() {
    // Data fields to be saved to local storage
    let formFields = document.querySelectorAll("#contactInfo input, input[type=radio], textarea");

    // Write each field to local storage
    for (let field of formFields) {
        localStorage.setItem(field.name, field.value);
    }
    console.log(localStorage);
}