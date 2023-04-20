const tip = document.querySelector("#tip-per-person");
const cost = document.querySelector("#total-per-person");

function resetResults() {
  tip.textContent = `$0.00`;
  cost.textContent = `$0.00`;
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
  tip.textContent = `$${tipPerPerson.toFixed(2)}`;
  cost.textContent = `$${costPerPerson.toFixed(2)}`;
}

//construct array of tip buttons
const tipPercentage = [5, 10, 15, 25, 50];
const tipButtons = tipPercentage.map((percentage) => {
  var id = `#tip${percentage}`;
  return { p: percentage, button: document.querySelector(`${id}`) };
});

const bill = document.querySelector("#bill");
const partySize = document.querySelector("#party-size");
const radioButtons = document.querySelectorAll(".tip-button");
const inputElements = [bill, partySize];

function inputValidates() {
  // check each input field against the appropriate regular expression
  let costRegex = /^(0|[1-9]\d*)(.\d{2})?$/;
  let naturalNumberRegex = /^[1-9]\d*$/;
  return costRegex.test(bill.value) && naturalNumberRegex.test(partySize.value);
}

function attemptUpdate() {
  if (inputValidates()) {
    let { p, _ } = tipButtons.find(({ _, button }) => button.checked);
    updateCosts(p);
  } else {
    resetResults();
  }
}

inputElements.forEach((element) => {
  element.addEventListener("change", attemptUpdate);
});

radioButtons.forEach((button) => {
  button.addEventListener("click", attemptUpdate);
});
