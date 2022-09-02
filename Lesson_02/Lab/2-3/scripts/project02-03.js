/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Austin Lennert
      Date:   8/29/2022

      Filename: project02-03.js
*/

function onHover(shape) {
      document.getElementById("feedback").innerText = `You're hovering over the ${shape}!`;
}

function offHover() {
      document.getElementById("feedback").innerText = '';
}