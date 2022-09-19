"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Austin Lennert
      Date:   9/19/22

      Filename: js05.js
*/

window.addEventListener("load", createLightBox);

function createLightBox() {
	// Lightbox Container
	let lightBox = document.getElementById("lightbox");

	// Parts of the Lightbox
	let lbTitle = document.createElement("h1");
	let lbCounter = document.createElement("div");
	let lbPrev = document.createElement("div");
	let lbNext = document.createElement("div");
	let lbPlay = document.createElement("div");
	let lbImages = document.createElement("div");
      
	// Design Lightbox Title
	lightBox.appendChild(lbTitle);
	lbTitle.id = "lbTitle";
	lbTitle.textContent = lightboxTitle;

	// Design the Lightbox slide counter
	lightBox.appendChild(lbCounter);
	lbCounter.id = "lbCounter";
	let currentImg = 1;
	updateCounter();
	// Design the lightbox previous slide button
	lightBox.appendChild(lbPrev);
	lbPrev.id = "lbPrev";
	lbPrev.innerHTML = "&#9664";
	lbPrev.onclick = showPrev;

	// Design the lightbox next slide button
	lightBox.appendChild(lbNext);
	lbNext.id = "lbNext";
	lbNext.innerHTML = "&#9654";
	lbNext.onclick = showNext;

	// Design the lightbox Play-Pause button
	lightBox.appendChild(lbPlay);
	lbPlay.id = "lbPlay";
	lbPlay.innerHTML = "&#9199";
	let timeID;
	lbPlay.onclick = function () {
		if (timeID) {
            // Stops the slideshow
            window.clearInterval(timeID);
            timeID = undefined;
		} else {
            // Plays the slideshow
			showNext();
			timeID = window.setInterval(showNext, 1500);
		}
	};

	// Design the lightbox images container
	lightBox.appendChild(lbImages);
	lbImages.id = "lbImages";

	// Add images from the imgFiles array to the container
	for (let i = 0; i < imgCount; i++) {
		let image = document.createElement("img");
		image.src = "./images/" + imgFiles[i];
		image.alt = imgCaptions[i];
        image.onclick = createOverlay;
		lbImages.appendChild(image);
	}

	/** Function to move forward through the image list */
	function showNext() {
		lbImages.appendChild(lbImages.firstElementChild);
		currentImg < imgCount ? currentImg++ : (currentImg = 1);
		updateCounter();
	}

	/** Funciton to move backward through the image list */
	function showPrev() {
		lbImages.insertBefore(
			lbImages.lastElementChild,
			lbImages.firstElementChild
		);
		currentImg > 1 ? currentImg-- : (currentImg = imgCount);
		updateCounter();
	}

    /** Updates the #/12 image counter */
	function updateCounter() {
		lbCounter.textContent = currentImg + "/" + imgCount;
	}

    /** Creates image popup */
    function createOverlay() {
        let overlay = document.createElement("div");
        overlay.id = "lbOverlay";

        // Add the figure box to the overlay
        let figureBox = document.createElement("figure");
        overlay.appendChild(figureBox);
        
        // Add the image to the figure box
        let overlayImage = this.cloneNode("true");
        figureBox.appendChild(overlayImage);

        // Add the caption
        let overlayCaption = document.createElement("figcaption");
        overlayCaption.textContent = this.alt;
        figureBox.appendChild(overlayCaption);

        // Add a close button
        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = function() {
            document.body.removeChild(overlay);
        }
        overlay.appendChild(closeBox);

        document.body.appendChild(overlay);
    }
}
