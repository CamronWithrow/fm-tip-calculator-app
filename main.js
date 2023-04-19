//construct array of tip buttons
const tipPercentage = [5, 10, 15, 25, 50];
const tipButtons = tipPercentage.map((percentage) => {
  let id = `tip${percentage}`;
  return document.querySelector(`#${id}`);
});

// this should return the tip amount *and* total amount together
function calculateTip(billTotal, percentage) {
  // currently can round down... need to check to make sure that doesn't happen
  return (billTotal * (1 + percentage / 100)).toFixed(2);
}

// attach listeners to each button that modifies the display
for (let i = 0; i < tipButtons.length; i++) {
  const button = tipButtons[i];
  const percentage = tipPercentage[i];
  button.addEventListener("click", () => {
    const billTotal = document.querySelector(".bill").value;
    let billPlusTip = calculateTip(billTotal, percentage);
    document.querySelector("#total-per-person").textContent = billPlusTip;
  });
}
