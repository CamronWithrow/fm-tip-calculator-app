function isValidEntry(htmlInput) {
  return htmlInput.value != "";
}

function resetResults() {
  document.querySelector("#tip-per-person").textContent = `$0.00`;
  document.querySelector("#total-per-person").textContent = `$0.00`;
}

// directly update the entries
function updateCosts(percentage) {
  const billTotal = document.querySelector("#bill").value;
  const partySize = document.querySelector("#party-size").value;
  // we calculate in terms of cents (not dollars) since pennies are atomic
  let tipPerPerson =
    Math.ceil(Math.ceil(billTotal * percentage) / partySize) / 100;
  let costPerPerson =
    Math.ceil((100 * billTotal) / partySize) / 100 + tipPerPerson;
  document.querySelector(
    "#tip-per-person"
  ).textContent = `$${tipPerPerson.toFixed(2)}`;
  document.querySelector(
    "#total-per-person"
  ).textContent = `$${costPerPerson.toFixed(2)}`;
}

//construct array of tip buttons
const tipPercentage = [5, 10, 15, 25, 50];
const tipButtons = tipPercentage.map((percentage) => {
  var id = `#tip${percentage}`;
  return { p: percentage, button: document.querySelector(`${id}`) };
});

const inputElements = document.querySelectorAll(".text-input");
const radioButtons = document.querySelectorAll(".tip-button");

function attemptUpdate() {
  for (const input of inputElements) {
    if (!isValidEntry(input)) {
      return resetResults();
    }
  }
  let { p, _ } = tipButtons.find(({ _, button }) => button.checked);
  updateCosts(p);
}

inputElements.forEach((element) => {
  element.addEventListener("change", attemptUpdate);
});

radioButtons.forEach((button) => {
  button.addEventListener("click", attemptUpdate);
});
