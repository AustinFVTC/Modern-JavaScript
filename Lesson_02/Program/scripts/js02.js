/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: Austin Lennert
      Date:   8/29/22

      Filename: js02.js
 */

/** Cost per photographer per hour */ 
const EMP_COST = 100;
/** Cost of memory book */
const BOOK_COST = 350;
/** Cost of reproduction rights */
const REPRO_COST = 1250;
/** Cost of travel per mile per photographer */
const TRAVEL_COST = 2;

let photoNum = document.getElementById("photoNum");
let photoHrs = document.getElementById("photoHrs");
let makeBook = document.getElementById("makeBook");
let photoRights = document.getElementById("photoRights");
let photoDist = document.getElementById("photoDist");

window.addEventListener("load", setupForm);

function setupForm() {
      photoNum.value = 1;
      photoHrs.value = 2;
      makeBook.checked = false;
      photoRights.checked = false;
      photoDist.value = 0;

      photoNum.onchange = updateEstimate;
      photoHrs.onchange = updateEstimate;
      makeBook.onchange = updateEstimate;
      photoRights.onchange = updateEstimate;
      photoDist.onchange = updateEstimate;

      updateEstimate();
}

function getEstimate() {
      let totalCost = 0;
      let photographers = photoNum.value;
      let hours = photoHrs.value;
      let distance = photoDist.value;
      let purchasedBook = makeBook.checked;
      let purchasedRights = photoRights.checked;

      totalCost += photographers * hours * EMP_COST;
      totalCost += photographers * distance * TRAVEL_COST;

      totalCost += purchasedBook ? BOOK_COST : 0;
      totalCost += purchasedRights ? REPRO_COST : 0;

      return totalCost;
}

function updateEstimate() {
      document.getElementById("estimate").innerHTML = "$" + getEstimate();
}