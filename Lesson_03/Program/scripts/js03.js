/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: Austin Lennert
     Date:   9/2/22

     Filename: js03.js
*/


// Days of the week
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

window.addEventListener("load", addWeekdays);
window.addEventListener("load", showGames);

/** Write weekday names into the caalendar */
function addWeekdays() {
     let i  = 0;

     let headingCells = document.getElementsByTagName("th");
     while( i < 7) {
          headingCells[i].innerHTML = weekDays[i];

          i++;
     }
}

/** Write game information into calendar */
function showGames() {
     for (let i = 0; i < gameDates.length; i++) {
          let gameInfo = '';

          switch (gameResults[i]) {
               case "W":
                    gameInfo += "<p class='win'>";
                    break;
               case "L":
                    gameInfo += "<p class='lose'>";
                    break;
               case "S":
                    gameInfo += "<p class='suspended'>";
                    break;
               case "P":
                    gameInfo += "<p class='postponed'>";
                    break;
          }

          // Display game location
          /*
          if (gameLocations[i] === "h") {
               gameInfo += "vs. ";
          } else {
               gameInfo += "@ ";
          }
          */
          gameInfo += (gameLocations[i] === "h") ? "vs. " : "@ ";

          gameInfo += gameOpponents[i] + "<br>";  // Add opponent
          gameInfo += `${gameResults[i]}: (${runsScored[i]} - ${runsAllowed[i]})`;  // Add results and score

          if (gameInnings[i] < 5) {
               gameInfo += ` [${gameInnings[i]}]***`;
          } else if (gameInnings[i] < 9) {
               gameInfo += ` [${gameInnings[i]}]*`;
          } else if (gameInnings[i] > 9) {
               gameInfo += ` [${gameInnings[i]}]`;
          }  // Else game went 9 innings

          gameInfo += "</p>";

          // Write info to table cell
          let tableCell = document.getElementById(gameDates[i]);
          tableCell.insertAdjacentHTML("beforeEnd", gameInfo);
     }
}