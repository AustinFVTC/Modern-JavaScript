"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Austin Lennert
      Date:   9-26-2022

      Filename: js06a.js
 */


window.addEventListener("load", () => {
      let orderForm = document.forms.orderForm;
      let model = orderForm.elements.model;

      // Select Model selection list when form opens
      model.focus()

      // Add an event istener for every form element

      for (let i = 0; i < orderForm.elements.length; i++) {
            orderForm.elements[i].onchange = calcOrder;
      }

      // Calculate the cost of the order
      calcOrder();

      function calcOrder() {
            // Determine the selected model
            let mIndex = model.selectedIndex;
            let mValue = model.options[mIndex].value;

            // Determing the selected quiantity
            let qIndex = orderForm.elements.qty.selectedIndex;
            let quantity = orderForm.elements.qty[qIndex].value;

            // Model cost = modelCost * quantity
            let modelCost = mValue*quantity;
            orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

            // Retrieve the cost of the protection plan
            let selectedPlan = document.querySelector("input[name='plan']:checked");
            let planValue = selectedPlan.value;

            // Charge the plan to each item ordered
            let planCost = planValue * quantity;
            orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

            // Calculate the order subtotal
            let subtotal = modelCost + planCost;
            orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"});

            // Calculate the 5% sales tax
            let salesTax = subtotal * 0.05;
            orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style: "currency", currency: "USD"});

            // Calculate the total cost of the order
            let totalCost = subtotal + salesTax;
            orderForm.elements.totalCost.value = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

            orderForm.elements.modelName.value = model.options[mIndex].text;
            orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
      }
});
