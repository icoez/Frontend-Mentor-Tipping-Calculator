function ValidateNumberInput(value, obj) {
  if (isNaN(value)) {
    obj.classList.add("invalid-custom");
    return -1;
  } else {
    obj.classList.remove("invalid-custom");
    return value;
  }
}
//!Handles bill total input
let billTotalInput = document.querySelector(".bill-price-input");
var billTotal;
billTotalInput.addEventListener("input", function () {
  billTotal = this.value;
  billTotal = ValidateNumberInput(this.value, this);
  Calculate();
});
//!Handles tip % input
let percentButtons = document.querySelectorAll(".btn");
let percentTip;
let currentPercentClass = "";

let customPercentInput = document.querySelector(".custom-tip");
customPercentInput.addEventListener("input", function () {
  ChangeToCustom();
  if (isNaN(customPercentInput.value)) {
    this.classList.add("invalid-custom");
    currentPercentClass = "custom-tip";
    percentTip = -1;
  } else {
    this.classList.remove("invalid-custom");
    percentTip = customPercentInput.value / 100;
    console.log(percentTip);
  }
  Calculate();
});
customPercentInput.addEventListener("focus", function () {
  ChangeToCustom();
  if (isNaN(customPercentInput.value)) {
    this.classList.add("invalid-custom");
    currentPercentClass = "custom-tip";
  }
});

function ChangeToCustom() {
  customPercentInput.classList.add("custom-selected");
  if (currentPercentClass !== "") {
    document
      .querySelector("." + currentPercentClass)
      .classList.remove("selected");
  }
}

for (let i = 0; i < percentButtons.length; i++) {
  //?Check for custom percentage input
  percentButtons[i].addEventListener("click", function () {
    let buttonClass = Array.from(this.classList)[0];
    switch (buttonClass) {
      case "percent5":
        percentTip = 0.05;
        break;
      case "percent10":
        percentTip = 0.1;
        break;
      case "percent15":
        percentTip = 0.15;
        break;
      case "percent25":
        percentTip = 0.25;
        break;
      case "percent50":
        percentTip = 0.5;
        break;

      default:
        console.log("No tip selected");
        break;
    }
    if (currentPercentClass !== "") {
      document
        .querySelector("." + currentPercentClass)
        .classList.remove("selected");
      //Removes the blue text from custom input to show it being selected
      customPercentInput.classList.remove("custom-selected");
      customPercentInput.classList.remove("invalid-custom");
    }
    this.classList.add("selected");
    currentPercentClass = buttonClass;
    Calculate();
  });
}
//!Handles number of people input
let numberOfPeopleInput = document.querySelector(".number-of-people-input");
var numberOfPeople;
numberOfPeopleInput.addEventListener("input", function () {
  numberOfPeople = this.value;
  numberOfPeople = ValidateNumberInput(numberOfPeople, this);
  Calculate();
});
//!Calcualtes output
function Calculate() {
  // alert(billTotal + " - " + percentTip + " - " + numberOfPeople);
  let tipAmountOutput = document.querySelector(".output-tip-amount");
  let totalAmountOutput = document.querySelector(".output-total-amount");
  if (
    percentTip == -1 ||
    isNaN(percentTip) ||
    percentTip === null ||
    numberOfPeople == -1 ||
    isNaN(numberOfPeople) ||
    numberOfPeople === null ||
    billTotal == -1 ||
    isNaN(billTotal) ||
    billTotal === null
  ) {
    tipAmountOutput.textContent = "N/A";
    totalAmountOutput.textContent = "N/A";
  } else {
    let tipAmountPerPerson = (billTotal * percentTip) / numberOfPeople;
    let tipAmountTotal = tipAmountPerPerson + billTotal / numberOfPeople;
    tipAmountOutput.textContent = (
      Math.round(tipAmountPerPerson * 100) / 100
    ).toFixed(2);
    totalAmountOutput.textContent = (
      Math.round(tipAmountTotal * 100) / 100
    ).toFixed(2);
  }
}
document.querySelector(".reset").addEventListener("click", function () {
  location.reload();
});
