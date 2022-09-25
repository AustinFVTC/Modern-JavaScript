"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-04

      Project to display footnotes in a popup window
      Author: Austin Lennert
      Date:   9/19/22

      Filename: project05-04.js
*/

// Node list of phrases that are associated with footnotes
let phrases = document.querySelectorAll("article blockquote dfn");

for (let i = 0; i < phrases.length; i++) {
      phrases[i].onclick = (() => {
            let phrase = document.createElement("h1");
            phrase.textContent = this.textContent;

            let footnote = document.createElement("p");
            footnote.textContent = footnotes[i];
            footnote.style = "font-style: italic; font-size: 1.2em;";

            let closeButton = document.createElement("input");
            closeButton.type = "button";
            closeButton.value = "Close Footnote";
            closeButton.style = "display: block; margin: 10px auto";

            let popup = window.open("", "Footnote", "width=300,height=200,top=100,left=100");
            let popUpBody = popup.document.body;
            popUpBody.style =  "background-color: ivory; font-size: 16px; padding: 10px;";
            popUpBody.appendChild(phrase);
            popUpBody.appendChild(footnote);
            popUpBody.appendChild(closeButton);
            console.log(closeButton);
            closeButton.onclick = (() => {popup.close();});
      })
}