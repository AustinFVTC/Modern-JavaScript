"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-01

      Project to retrieve the Astronomy Picture of the Day from NASA
      Author: Austin Lennert
      Date:   11/14/22

      Filename: project11-01.js
*/

let imageBox = document.getElementById("nasaImage");
let dateBox = document.getElementById("dateBox");

dateBox.onchange = function () {
	let dateStr = dateBox.value;
	fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateStr}`)
		.then((res) => res.json())
		.then((jsonObj) => showPicture(jsonObj))
		.catch((rej) => console.log(rej));
};

function showPicture(json) {
    if (json.media_type === "video") {
        imageBox.innerHTML = `<iframe src="${json.url}"></iframe><h1>${json.title}</h1><p>${json.explanation}</p>`;
    } else if (json.media_type === "image") {
        imageBox.innerHTML = `<img src="${json.url}"/><h1>${json.title}</h1><p>${json.explanation}</p>`;
    } else {
        imageBox.innerHTML = "Image unavailable";
    }
}
