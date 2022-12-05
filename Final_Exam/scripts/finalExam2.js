"use strict";
/*    Modern JavaScript
      Final Exam 2

      Project to create a drag and drop jigsaw puzzle
      Author: Austin Lennert
      Date:   12/5/22

      Filename: finalExam2.js
*/

// Reference to the puzzle board
let puzzleBoard = document.getElementById("puzzleBoard");
// Counter for the zIndex style of each puzzle piece
let zCounter = 1;
// Array of integers from 1 to 48
let intList = new Array(48);
// pointerX and pointerY will contain the initial coordinates of the pointerX
// pieceX and pieceY will contain the initial coordinates of a puzzle piece
let pointerX, pointerY, pieceX, pieceY;

// Sort the integers from 1 to 48 in random order
for (let i = 0; i < 48 ; i++) {
   intList[i] = i+1;
}
intList.sort(function() {
   return 0.5 - Math.random();
});

// generate randomly-sorted puzzle pieces
for (let i = 0; i < 48; i++) {
   let piece = document.createElement("img");
   piece.src = "./images/piece" + intList[i] + ".png";
   let rowNum = Math.ceil((i+1)/8);
   let colNum = (i + 1) - (rowNum - 1)*8;
   piece.style.top = (rowNum - 1)*98 + 7 + "px";
   piece.style.left = (colNum - 1)*98 + 7 + "px";
   piece.draggable = false; // override the default draggability of images
   puzzleBoard.appendChild(piece);      
}

// Node list representing the puzzle pieces
let pieces = document.querySelectorAll("div#puzzleBoard img");

for (let piece of pieces) {
   piece.addEventListener("pointerdown", grabPiece);
}

function grabPiece(e) {
   let piece = e.target;
   
   pointerX = e.clientX;
   pointerY = e.clientY;

   zCounter++;
   
   piece.style.touchAction = "none";
   piece.style.zIndex = zCounter;
   
   pieceX = piece.offsetLeft;
   pieceY = piece.offsetTop;

   piece.addEventListener("pointermove", movePiece);
   piece.addEventListener("pointerup", dropPiece);
}

function movePiece(e) {
   let piece = e.target;

   let dx = e.clientX - pointerX;
   let dy = e.clientY - pointerY;

   piece.style.left = `${pieceX+dx}px`;
   piece.style.top = `${pieceY+dy}px`;
}

function dropPiece(e) {
   let piece = e.target;
   piece.removeEventListener("pointermove", movePiece);
   piece.removeEventListener("pointerup", dropPiece);
}