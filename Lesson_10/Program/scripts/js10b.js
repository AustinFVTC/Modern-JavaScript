"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House Directions
    Author: 
    Date:   

    Filename: js10b.js
*/


const btnDir = document.getElementById("directions");

// Setup API key and initialize the map
L.mapquest.key = "0AMgiECFQTO4uwkgVBcAKPa5lYPRWtIx";

var baseLayer = L.mapquest.tileLayer("map");

// "map" refers to a <div> element with the ID map
var map = L.mapquest.map('map', {
    center: [37.7749, -122.4194],
    layers: baseLayer,
    zoom: 12
});

L.mapquest.geocoding().geocode('1825 N Bluemound Dr, Appleton, WI 54912');

// Add the Map layers
L.control.layers({
    'Map': baseLayer,
    'Hybrid': L.mapquest.tileLayer('hybrid'),
    'Satellite': L.mapquest.tileLayer('satellite'),
    'Light': L.mapquest.tileLayer('light'),
    'Dark': L.mapquest.tileLayer('dark')
}).addTo(map);

map.addControl(L.mapquest.control());

var drawnItems = L.featureGroup().addTo(map);

map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        }
    }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
});

btnDir.addEventListener('click', () => {
    switch (btnDir.value) {
        case "Map Directions":
            console.log("showing");
            btnDir.value = "Hide Directions";

            L.mapquest.directionsControl({
                routeSummary: {
                    enabled: false
                },
                narrativeControl: {
                    enabled: true,
                    compactResults: false
                }
            }).addTo(map);
            break;
        case "Hide Directions":
            console.log("hiding");
            btnDir.value = "Map Directions";
            location.reload();
            break;
    }
}); 