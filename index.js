const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");
const changeBtn = document.getElementById("change-btn");
const plansSwitchBtn = document.getElementById("plans-switch");
const form = document.getElementById("form");
const buttonsSection = document.getElementById("buttonsSection");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");
const totalContainer = document.getElementById("total-amount-container");
const selectedPlanAmount = document.getElementById("selected-plan-amount");
const finalPlanHeading = document.getElementById("final-plan-heading");
const addOnsList = document.querySelector("ul");
const stepsSideBar = document.getElementById("steps-side-bar");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

let step = 1;

const plansData = {
  month: { "plan-arcade": 9, "plan-advanced": 12, "plan-pro": 15 },
  year: { "plan-arcade": 90, "plan-advanced": 120, "plan-pro": 150 },
};

const addOnsData = {
  month: { "online-service": 1, storage: 2, profile: 2 },
  year: { "online-service": 10, storage: 20, profile: 20 },
};

function handleClick(value, e) {
  e.preventDefault();
  if (!validate()) {
    return;
  }

  if (step === 4 && value === 1) {
    buttonsSection.hidden = true;
    updateStepVisibility(step, false);
    step++;
    updateStepVisibility(step, true);
    return;
  }

  if ((step < 4 && value === 1) || (value === -1 && step > 1)) {
    updateStepVisibility(step, false);
    step += value;
    updateStepVisibility(step, true);
  }
  nextBtn.textContent = "Next Step";
  nextBtn.classList.add("bg-[var(--marine-blue)]");
  if (step === 4) {
    nextBtn.textContent = "Confirm";
    nextBtn.classList.add("bg-[var(--purplish-blue)]");
  }
  buttonsSection.firstElementChild.classList.toggle("invisible", step === 1);

  updatePricing();
}

function updatePricing() {
  const isYearly = plansSwitchBtn.checked;
  const duration = isYearly ? "yr" : "mo";
  const selectedPlan = document.querySelector("input[type=radio]:checked");
  const selectedAddOns = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );

  // Update Labels
  monthLabel.classList.toggle("text-[var(--cool-gray)]", isYearly);
  yearLabel.classList.toggle("text-[var(--cool-gray)]", !isYearly);

  // Update Plan Pricing
  Object.entries(plansData[isYearly ? "year" : "month"]).forEach(
    ([id, price]) => {
      const inputEle = document.getElementById(id);
      inputEle.value = price;
      const amountEl = inputEle.nextElementSibling.lastElementChild;
      amountEl.children[1].textContent = `$${price}/${duration}`;
      amountEl.children[2].hidden = !isYearly;
    }
  );

  // Update Add-On Pricing
  Object.entries(addOnsData[isYearly ? "year" : "month"]).forEach(
    ([id, price]) => {
      const checkboxEle = document.getElementById(id);
      checkboxEle.value = price;
      checkboxEle.nextElementSibling.lastElementChild.textContent = `+$${price}/${duration}`;
    }
  );

  // Update Final Amounts
  let totalAmount = parseInt(selectedPlan?.value || 0);
  selectedPlanAmount.textContent = `$${totalAmount}/${duration}`;
  finalPlanHeading.textContent = `${selectedPlan?.dataset.planName} (${
    isYearly ? "Yearly" : "Monthly"
  })`;

  addOnsList.innerHTML = "";
  const hrTag = document.getElementsByTagName("hr")[0];
  hrTag.hidden = true;
  selectedAddOns.forEach((addOn) => {
    if (addOn.id !== "plans-switch") {
      hrTag.hidden = false;
      totalAmount += parseInt(addOn.value);
      addOnsList.innerHTML += `<li class="flex justify-between m-2">
          <span>${addOn.dataset.addOnName}</span> 
          <span>$${addOn.value}/${duration}</span>
        </li>`;
    }
  });

  totalContainer.firstElementChild.textContent = `Total (per ${
    isYearly ? "year" : "month"
  })`;
  totalContainer.lastElementChild.textContent = `+$${totalAmount}/${duration}`;
}

function updateStepVisibility(step, isVisible) {
  const section = document.getElementById(`section${step}`);
  const stepEl = document.getElementById(`step${step === 5 ? step - 1 : step}`);

  if (section) section.hidden = !isVisible;
  if (stepEl) {
    stepEl.classList.toggle("bg-[var(--light-blue)]", isVisible);
    stepEl.classList.toggle("text-black", isVisible);
  }
}

function validate() {
  let isValid = true;
  if (userName.value.trim() == "") {
    showErrors(true, userName, "Please enter name");
    isValid = false;
  } else {
    showErrors(false, userName);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.value)) {
    showErrors(true, email, "Please enter a correct email ID");
    isValid = false;
  } else {
    showErrors(false, email);
  }

  if (!/^\d{10}$/.test(phone.value)) {
    isValid = false;
    showErrors(true, phone, "Please enter valid phone number");
  } else {
    showErrors(false, phone);
  }
  return isValid;
}

function showErrors(isError, element, message = "") {
  element.previousElementSibling.lastElementChild.textContent = message;
  element.classList.toggle("border-[var(--strawberry-red)]", isError);
  isError && element.focus();
}
// Event Listeners
nextBtn.addEventListener("click", (e) => handleClick(1, e));
prevBtn.addEventListener("click", (e) => handleClick(-1, e));
changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateStepVisibility(4, false);
  step = 2;
  updateStepVisibility(step, true);
  buttonsSection.firstElementChild.classList.remove("invisible");
});
plansSwitchBtn.addEventListener("change", updatePricing);
