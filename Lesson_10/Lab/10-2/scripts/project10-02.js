"use strict";
/*    JavaScript 7th Edition
      Chapter 10
      Project 10-02
      Project to create a drag and drop tangram puzzle
      Author: Austin Lennert
      Date:   11/7/22
      Filename: project10-02.js
*/

// Reference to the tangram puzzle board
let puzzleBoard = document.getElementById("puzzle");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
let eventX, eventY, tanX, tanY;

// Node list representing the tangram pieces
let tans = document.querySelectorAll("div#puzzle > img");

// Function to rotate a tan by a specified number of degrees
function rotateTan(elem, deg) {
    const obj = window.getComputedStyle(elem, null);
    const matrix = obj.getPropertyValue("transform");
    let angle = 0;
    if (matrix !== "none") {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = values[0];
        const b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    if (angle < 0) {
        angle += 360;
    }

    let newAngle = angle + deg;

    elem.style.transform = "rotate(" + newAngle + "deg)";
}

/** Handles grabbing a tan piece */
function grabTan(e) {
    if (e.shiftKey) {
        rotateTan(e.target, 15);
        return;
    }

    eventX = e.clientX;
    eventY = e.clientY;
    zCounter++;
    e.target.style.zIndex = zCounter;

    tanX = e.target.offsetLeft;
    tanY = e.target.offsetTop;

    e.target.addEventListener("pointermove", moveTan);
    e.target.addEventListener("pointerup", dropTan);
}

/** Handles moving a tan piece */
function moveTan(e) {
    let currentX = e.clientX;
    let currentY = e.clientY;
    let deltaX = currentX - eventX;
    let deltaY = currentY - eventY;

    // Calculate thet able's new position
    e.target.style.left = tanX + deltaX + "px";
    e.target.style.top = tanY + deltaY + "px";
    console.log(tanX);
}

/** Handles droping a tan piece */
function dropTan(e) {
    e.target.removeEventListener("pointermove", moveTan);
    e.target.removeEventListener("pointerup", dropTan);
}
