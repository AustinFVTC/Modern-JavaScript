"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Project 08-04

      Retrieve Staff Data from a JSON File
      Author: Austin Lennert
      Date:   10/24/22

      Filename: project08-04.js
*/


let getFileButton = document.getElementById("getFile");
let containerBox = document.getElementById("container");

getFileButton.onchange = function() {
   // Retrieve information about the selected file
   let JSONfile = this.files[0];
   
   // Read the contents of the selected file
   let fr = new FileReader();
   fr.readAsText(JSONfile); 

   // Once the file has finished loading, parse the JSON file
   fr.onload=function(){ 
      let staff = JSON.parse(fr.result);
      makeStaffTable(staff);
   }
   
};

function makeStaffTable(staff) {
   let staffTable = document.createElement("table");
   let headerRow = document.createElement("tr");
   
   // Setup headers
   for (let key in staff.directory[0]) {
      let headerCell = document.createElement("th");
      headerCell.id = "headerCell";
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
   }

   staffTable.appendChild(headerRow);
   for (let i in staff.directory) {
      let member = staff.directory[i];
      let dataRow = document.createElement("tr");
      for (let key in member) {
         let dataCell = document.createElement("td");
         dataCell.textContent = member[key];
         dataRow.appendChild(dataCell);
      }
      staffTable.appendChild(dataRow);
   }

   containerBox.appendChild(staffTable);
}