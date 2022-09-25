"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author: Austin Lennert
      Date:   9/19/22

      Filename: project05-03.js
*/


let sourceDoc = document.getElementById("source_doc");
/** Table of Contents element */
let toc = document.getElementById("toc");
let headingCount = 1;
const HEADING = "H2";
console.log("Running script");
for (let childNode = sourceDoc.firstElementChild; childNode !== null; childNode = childNode.nextElementSibling) {
      console.log("Looping");
      if (childNode.nodeName === HEADING) {
            console.log("Found match");
            let anchor = document.createElement("a");
            anchor.name = "doclink" + headingCount;
            childNode.insertBefore(anchor, childNode.firstElementChild);
            
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            listItem.appendChild(link);
            link.textContent = childNode.textContent;
            link.href = "#doclink" + headingCount;
            toc.appendChild(listItem);
            headingCount++;
      }
}