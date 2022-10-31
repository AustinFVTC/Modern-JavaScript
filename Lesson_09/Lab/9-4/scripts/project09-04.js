"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-04

      Project to store high scores from a game in a cookie
      Author: Austin Lennert
      Date:   10/31/22

      Filename: project09-04.js
*/

/* Page Objects */

/** Key name for the representative cookie in local storage */
const cookieKey = "Key";

let bestText = document.getElementById("best");
let clockTimer = document.getElementById("timer");

// Custom event that runs when the puzzle is solved
window.addEventListener("puzzleSolved", updateRecord);

// Event listener that is run when the page loads
window.addEventListener("load", function () {
    if (localStorage.getItem(cookieKey)) {
        bestText.textContent = `${getBestTime()} seconds`;
    }
});

function getBestTime() {
    if (!localStorage.getItem(cookieKey)) {
        return 9999;
    }
    return parseInt(localStorage.getItem(cookieKey));
}

function updateRecord() {
    let solutionTime = parseInt(clockTimer.value);
    let bestTime = getBestTime();
    console.log("Lemme check");
    if (solutionTime < bestTime) {
        console.log("You did better son");
        bestTime = solutionTime;
        bestText.textContent = `${bestTime} seconds`;
        localStorage.setItem(cookieKey, bestTime);
    }
}