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
const cookieKey = "best-time";

let bestText = document.getElementById("best");
let clockTimer = document.getElementById("timer");

// Custom event that runs when the puzzle is solved
window.addEventListener("puzzleSolved", updateRecord);

// Event listener that is run when the page loads
window.addEventListener("load", function () {
    if (getCookies()[cookieKey]) {
        bestText.textContent = `${getBestTime()} seconds`;
    }
});

function getBestTime() {
    if (!getCookies()[cookieKey]) {
        return 9999;
    }
    return parseInt(getCookies()[cookieKey]);
}

function updateRecord() {
    let solutionTime = parseInt(clockTimer.value);
    let bestTime = getBestTime();
    if (solutionTime < bestTime) {
        bestTime = solutionTime;
        bestText.textContent = `${bestTime} seconds`;
        storeBestTimeCookie(bestTime);
    }
}

function storeBestTimeCookie(bestTime) {
    //                                 90 days in secs
    writeCookie(cookieKey, bestTime, 90*24*60*60);
}


/**
 * Function to write a cookie
 * @param {string} cookieName - Name of the cookie
 * @param {any} value - Value to write to cookie
 * @param {age} age - Max-age of cookies in seconds
 * @param {datetime} expDate - Expiration datetime of cookie
 * @param {string} path - Cookie path
 * @param {string} domain - Cookie domain
 * @param {boolean} secure - Whether cookie can be transfered only via HTTPS or not
 */
function writeCookie(cookieName, value, age=null, expDate=null, path=null, domain=null, secure=null) {
    let cookieString = cookieName+'='+encodeURIComponent(value);
    if (age) cookieString += ";max-age=" + age;
    if (expDate) cookieString += ";expires=" + expDate.toUTCString();
    if (path) cookieString += ";path=" + path;
    if (domain) cookieString += ";domain=" + domain;
    if (secure) cookieString += ";secure";
    document.cookie = cookieString;
}

function getCookies() {
    let fields = {};

    if (document.cookie) {
        let cookieList = document.cookie.split("; ");

        for (let cookie of cookieList) {
            cookie = cookie.split("=");
            let name = cookie[0];
            let value = decodeURIComponent(cookie[1]);
            fields[name] = value;
        }
    }
    return fields;
}