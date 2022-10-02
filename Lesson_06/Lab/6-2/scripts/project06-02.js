"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-02

      Project to turn a selection list into a selection of hypertext links
      Author: Austin Lennert
      Date:   9-26-2022

      Filename: project06-02.js
*/


window.addEventListener("load", (evt) => {
      let allSelect = document.querySelectorAll("form#govLinks select");
      allSelect.forEach(((select) => {
            select.onchange = ((evt) => {
                  let linkURL = evt.target.value;
                  let newWin = window.open(linkURL);
            });
      }));
});