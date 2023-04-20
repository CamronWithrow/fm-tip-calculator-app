const tip = document.querySelector("#tip-per-person");
const cost = document.querySelector("#total-per-person");

const tipPercentage = [5, 10, 15, 25, 50];
var tipButtons = tipPercentage.map((percentage) => {
  var id = `#tip${percentage}`;
  return document.querySelector(`${id}`);
});

let percentageMap = new Map();
for (let i = 0; i < tipButtons.length; i++) {
  percentageMap.set(tipButtons[i], tipPercentage[i]);
}

// custom is treated seperately from the other tip buttons...
const customTip = document.querySelector("#custom");
tipButtons = tipButtons.concat([customTip]);

const bill = document.querySelector("#bill");
const partySize = document.querySelector("#party-size");
const customPercentage = document.querySelector("#custom-tip");
const radioButtons = document.querySelectorAll(".tip-button");
const inputElements = [bill, partySize, customPercentage];

function resetResults() {
  tip.textContent = `$0.00`;
  cost.textContent = `$0.00`;
}

// directly update the entries
function updateCosts(percentage) {
  let billTotal = Number(bill.value);
  let count = Number(partySize.value);
  // we calculate in terms of cents (not dollars) since pennies are atomic
  let tipPerPerson = Math.ceil(Math.ceil(billTotal * percentage) / count) / 100;
  let costPerPerson = Math.ceil((100 * billTotal) / count) / 100 + tipPerPerson;
  tip.textContent = `$${tipPerPerson.toFixed(2)}`;
  cost.textContent = `$${costPerPerson.toFixed(2)}`;
}

function inputValidates() {
  let costRegex = /^(0|[1-9]\d*)(.\d{2})?$/;
  let naturalNumberRegex = /^[1-9]\d*$/;
  // if custom tip is selected, we also need to validate the tip percentage
  let tipRegex = /^\d+$/;
  if (customTip.checked) {
    let p = customPercentage.value;
    if (tipRegex.test(p)) {
      percentageMap.set(customTip, Number(p));
    } else {
      return false;
    }
  }
  return costRegex.test(bill.value) && naturalNumberRegex.test(partySize.value);
}

function attemptUpdate() {
  if (inputValidates()) {
    let activeButton = tipButtons.find((button) => button.checked);
    let p = percentageMap.get(activeButton);
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

function resetAll() {
  resetResults();
  inputElements.forEach((element) => {
    element.value = "";
  });
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  document.querySelector("#tip15").checked = true;
}

document.querySelector(".reset-button").addEventListener("click", resetAll);
