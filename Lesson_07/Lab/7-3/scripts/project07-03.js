"use strict";
/*    JavaScript 7th Edition
      Chapter 7
      Project 07-03

      Project to create a New Year's Eve countdown clock
      Author: Austin Lennert
      Date:   10/9/22

      Filename: project07-03.js
*/

let currentTime = document.getElementById("currentTime");
let daysLeftBox = document.getElementById("days");
let hrsLeftBox = document.getElementById("hours");
let minsLeftBox = document.getElementById("minutes");
let secsLeftBox = document.getElementById("seconds");

let interval = setInterval(countdown, 1000);
countdown()  // Run the countdown function within the first second of loading

function countdown() {
    let now = new Date()
    currentTime.textContent = now.toLocaleString();

    let newYear = new Date("January 1");
    let nextYear = now.getFullYear() + 1;
    newYear.setFullYear(nextYear);

    let floor = Math.floor;

    let days = (newYear - now) / (1000*60*60*24);

    let hrs  = 24 * (days - floor(days));
    let mins = 60 * (hrs  - floor(hrs ));
    let secs = 60 * (mins - floor(mins));

    daysLeftBox.textContent = floor(days).toLocaleString("en-us", {minimumIntegerDigits: 2});
    hrsLeftBox.textContent  = floor(hrs ).toLocaleString("en-us", {minimumIntegerDigits: 2});
    minsLeftBox.textContent = floor(mins).toLocaleString("en-us", {minimumIntegerDigits: 2});
    secsLeftBox.textContent = floor(secs).toLocaleString("en-us", {minimumIntegerDigits: 2});
}