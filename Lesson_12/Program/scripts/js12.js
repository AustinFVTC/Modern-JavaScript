"use strict";

/*  JavaScript 7th Edition
    Chapter 12
    Chapter case

    Bonsai Expressions FAQ 
    Author: Austin Lennert
    Date:   11/27/22

    Filename: js12.js
*/

// jQuery Run once the page is loaded and ready
$(() => {
    // Animate the h1 heading
    $("section > h1").css({
        fontSize: 0,
        opacity: 0,
    }).animate({
        fontSize: "2.3em",
        opacity: 1,
    }, 600);

    $("dl#faq")
    .hide()
    .effect("clip", {
        mode: "show",
        direction: "horizontal"
    }, 600);

    $("dl#faq dt").click(e => {
        let questionElem = $(e.target);
        let answerElem = $(questionElem.next());
        $(questionElem).toggleClass("hiddenAnswer");

        // Toggle the view of the answer if it's supposed to be hidden or not
        $(answerElem).slideDown(600);
        if ($(questionElem).hasClass("hiddenAnswer")) {
            $(answerElem).slideUp(600);
        }
    })
})