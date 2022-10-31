"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Chapter case
      
      Eating Well in Season Retrieving Data from Local Storage
      Author: Austin Lennert
      Date:   10/31/22
      
      Filename: js09c.js
 */

// Eating Well Preference Keys
let keys = [
	"name",
	"email",
	"phone",
	"address",
	"city",
	"state",
	"zip",
	"allergies",
	"frequency",
	"size",
];



for (let key of keys) {
	let newRow = document.createElement("tr");

	// Display the storage key
	let keyCell = document.createElement("td");
	keyCell.textContent = key;
	newRow.appendChild(keyCell);

	// Display the key value
	let valueCell = document.createElement("td");
	valueCell.textContent = localStorage.getItem(key);
	newRow.appendChild(valueCell);

	// Append each key:name pair as a table row
	document.getElementById("prefTable").appendChild(newRow);
}

// Remove Eating Well keys when the Remove Preference button is clicked
document.getElementById("removePrefBtn").onclick = function () {
	for (let key of keys) {
		localStorage.removeItem(key);
	}
};
