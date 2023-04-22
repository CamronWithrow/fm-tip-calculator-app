const radioButtons = Array.from(document.querySelectorAll("[type='radio']"));
let percentageMap = new Map();
radioButtons.forEach((button) => {
  let percentage = Number(button.dataset.percentage);
  percentageMap.set(button, percentage);
});

const bill = document.querySelector("#bill-input");
const partySize = document.querySelector("#party-input");
const customTip = document.querySelector("#custom-tip");
const inputElements = [bill, partySize];

const tip = document.querySelector("#tip-amount");
const cost = document.querySelector("#total-amount");

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
  if (customTip.focus) {
    let p = customTip.value;
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

var activeButton = null;

function attemptUpdate() {
  if (inputValidates()) {
    document.querySelector(".reset").disabled = false;
    let p = percentageMap.get(activeButton);
    updateCosts(p);
  } else {
    document.querySelector(".reset").disabled = true;
    resetResults();
  }
}

inputElements.forEach((element) => {
  element.addEventListener("change", attemptUpdate);
});

function customTipEvent() {
  activeButton = customTip;
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  attemptUpdate();
}

customTip.addEventListener("change", customTipEvent);
customTip.addEventListener("focus", customTipEvent);

radioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeButton = button;
    attemptUpdate();
  });
});

function resetAll() {
  document.querySelector(".reset").disabled = true;
  resetResults();
  inputElements.forEach((element) => {
    element.value = "";
  });
  customTip.value = "";
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  activeButton = null;
}

document.querySelector(".reset").addEventListener("click", resetAll);
