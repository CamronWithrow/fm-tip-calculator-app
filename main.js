const fixedTips = [5, 10, 15, 25, 50];
let percentageMap = new Map();
fixedTips.forEach((percentage) => {
  var id = `#tip${percentage}`;
  percentageMap.set(document.querySelector(`${id}`), percentage);
});

const bill = document.querySelector("#bill");
const partySize = document.querySelector("#party-size");
const customPercentage = document.querySelector("#custom-tip");
const inputElements = [bill, partySize, customPercentage];
const radioButtons = Array.from(document.querySelectorAll(".tip-button"));
// should only validate customPercentage if customTip is checked
const customTip = document.querySelector("#custom");

const tip = document.querySelector("#tip-per-person");
const cost = document.querySelector("#total-per-person");

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

function resetResults() {
  tip.textContent = `$0.00`;
  cost.textContent = `$0.00`;
}

function attemptUpdate() {
  if (inputValidates()) {
    let activeButton = radioButtons.find((button) => button.checked);
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
