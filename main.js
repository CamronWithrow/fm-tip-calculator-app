//construct array of tip buttons
const tipPercentage = [5, 10, 15, 25, 50, "custom"];
const tipButtons = tipPercentage.map((percentage) => {
  if (percentage === "custom") {
    // currently doesn't update at the right time...
    // need to click on the input field again after the button is selected and the field contains a value
    var id = ".custom-tip";
  } else {
    var id = `#tip${percentage}`;
  }
  return document.querySelector(`${id}`);
});

// directly update the entries
function updateCosts(percentage) {
  if (percentage === "custom") {
    percentage = document.querySelector(".custom-tip").value;
  }
  const billTotal = document.querySelector(".bill").value;
  const partySize = document.querySelector(".party-size").value;
  // we calculate in terms of cents (not dollars) since pennies are atomic
  let tipPerPerson =
    Math.ceil(Math.ceil(billTotal * percentage) / partySize) / 100;
  let costPerPerson =
    Math.ceil((100 * billTotal) / partySize) / 100 + tipPerPerson;
  document.querySelector("#tip-per-person").textContent =
    tipPerPerson.toFixed(2);
  document.querySelector("#total-per-person").textContent =
    costPerPerson.toFixed(2);
}

for (let i = 0; i < tipButtons.length; i++) {
  const button = tipButtons[i];
  const percentage = tipPercentage[i];
  button.addEventListener("click", () => updateCosts(percentage));
}
