"use strict";
/*    JavaScript 7th Edition
    Chapter 8
    Project 08-01

    Project to create a timer object
    Author: Austin Lennert
    Date:   10/17/22

    Filename: project08-01.js
*/

/*--------------- Object Code --------------------*/

class Timer {
    constructor(min, sec) {
        this.minutes = min;
        this.seconds = sec;
        this.timeID = null;
    }

    /**
     * Toggles the state of the timer
     * @param {element} minBox - Minute element
     * @param {element} secBox - Seconds element
     */
    runPause(minBox, secBox) {
        let countdown = () => {
            if (this.seconds > 0) {
                this.seconds--;
            } else if (this.minutes > 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                window.clearInterval(this.timeID);
                this.timeID = null;
            }
            minBox.value = this.minutes;
            secBox.value = this.seconds;
        };

        if (this.timeID) {  
            window.clearInterval(this.timeID);
            this.timeID = null;
        }  else {
            this.timeID = window.setInterval(countdown, 1000);
        }
    }
}


/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

let myTimer = new Timer(minBox.value, secBox.value);

minBox.onchange         = () => { myTimer.minutes = minBox.value; }
secBox.onchange         = () => { myTimer.seconds = secBox.value; }
runPauseTimer.onclick   = () => { myTimer.runPause(minBox, secBox); }
