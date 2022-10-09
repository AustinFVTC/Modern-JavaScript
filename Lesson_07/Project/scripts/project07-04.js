"use strict";
/*  JavaScript 7th Edition
    Chapter 7
    Project 07-04

    Project to create a customer queue
    Author: Austin Lennert
    Date:   10/9/22

    Filename: project07-04.js
*/

let customers = ["Alisha Jordan","Kurt Cunningham", "Ricardo Lopez", "Chanda Rao",
                 "Kevin Grant", "Thomas Bey", "Elizabeth Anderson", "Shirley Falk",
                 "David Babin", "Arthur Blanding", "Brian Vick", "Jaime Aguilar",
                 "Eileen Rios", "Gail Watts", "Margaret Wolfe", "Kathleen Newman",
                 "Jason Searl", "Stephen Gross", "Robin Steinfeldt", "Jacob Bricker",
                 "Gene Bearden", "Charles Sorensen", "John Hilton", "David Johnson",
                 "Wesley Cho"];

let customerName = document.getElementById("customerName");
let customerList = document.getElementById("customerList");

let addButton = document.getElementById("addButton");
let searchButton = document.getElementById("searchButton");
let removeButton = document.getElementById("removeButton");
let topButton = document.getElementById("topButton");

let status = document.getElementById("status");

generateCustomerList();

// Function to generate the ordered list based on the contents of the customers array
function generateCustomerList() {
    customerList.innerHTML = "";
    for (let i = 0; i < customers.length; i++) {
        let customerItem = document.createElement("li");      
        customerItem.textContent = customers[i];     
        customerList.appendChild(customerItem);
    }
}

addButton.onclick = addCustomer;
searchButton.onclick = searchCustomer;
removeButton.onclick = removeCustomer;
topButton.onclick = removeTopCustomer;

function addCustomer() {
    let custName = customerName.value;
    customers.push(custName);
    generateCustomerList();
    status.textContent = `${custName} added to end of queue`;
}

function removeCustomer() {
    let custName = customerName.value;
    let custIndex = customers.indexOf(custName);
    
    if (custIndex + 1) {
        customers.splice(custIndex, 1);
        generateCustomerList();
        status.textContent = `${custName} removed from queue`
    } else {
        status.textContent = `${custName} not found in queue`;
    }
}

function searchCustomer() {
    let custName = customerName.value;
    let custIndex = customers.indexOf(custName) + 1;

    if (custIndex) {
        status.textContent = `${custName} found in position ${custIndex} of the queue`;
    } else {
        status.textContent = `${custName} not found in queue`;
    }

}

function removeTopCustomer() {
    let custName = customers.shift();
    generateCustomerList();
    status.textContent = `${custName} removed from top of queue`;
}
