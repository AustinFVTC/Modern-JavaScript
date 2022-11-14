"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-02

      Project to city and state information from a provided postal code
      Author: Austin Lennert
      Date:   11/14/22

      Filename: project11-02.js
*/

let postalCode = document.getElementById("postalCode");
let place = document.getElementById("place");
let region = document.getElementById("region");
let country = document.getElementById("country");

let zippoURL = (country, postal) => `http://api.zippopotam.us/${country}/${postal}`;

postalCode.onblur = function () {
    let codeValue = postalCode.value;
    let countryValue = country.value;
    place.value = "";
    region.value = "";

    fetch(zippoURL(countryValue, codeValue))
    .then(res => res.json())  // promise.json() returns a PROMISE, so you NEED to .then
    .then(json => {
        place.value = json.places[0]["place name"];
        region.value = json.places[0]["state abbreviation"];
    })
    .catch(err => console.log(err));
};
