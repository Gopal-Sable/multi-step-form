const nextBtn = document.getElementById("nextBtn");
const stepsSideBar = document.getElementById("steps-side-bar");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const prevBtn = document.getElementById("prevBtn");
const plansSwitchBtn = document.getElementById("plans-switch");
const changeBtn = document.getElementById("change-btn");

changeBtn.onclick = (e) => {
  e.preventDefault();
  handleClick(-1, e);
  handleClick(-1, e);
};
const toggleAmount = (e) => {
  const monthLabel = document.getElementById("month-label");
  const yearLabel = document.getElementById("year-label");
  if (plansSwitchBtn.checked) {
    // checked means year
    yearLabel.classList.remove("text-[var(--cool-gray)]");
    monthLabel.classList.add("text-[var(--cool-gray)]");
    for (const key in plansData.year) {
      const inputEle = document.getElementById(key);
      inputEle.value = plansData.year[key];
      let showAmountEle = inputEle.nextElementSibling.lastElementChild;
      showAmountEle.children[1].innerHTML = `$${inputEle.value}/yr`;
      showAmountEle.children[2].hidden = false;
    }

    for (const key in addOnsData.year) {
      let checkboxEle = document.getElementById(key);
      let value = addOnsData.year[key];
      checkboxEle.value = value;
      checkboxEle.nextElementSibling.lastElementChild.textContent = `+$${value}/yr`;
    }
  } else {
    monthLabel.classList.remove("text-[var(--cool-gray)]");
    yearLabel.classList.add("text-[var(--cool-gray)]");
    for (const key in plansData.month) {
      const inputEle = document.getElementById(key);
      inputEle.value = plansData.month[key];
      let showAmountEle = inputEle.nextElementSibling.lastElementChild;
      showAmountEle.children[1].innerHTML = `$${inputEle.value}/mo`;
      showAmountEle.children[2].hidden = true;
    }
    for (const key in addOnsData.month) {
      let checkboxEle = document.getElementById(key);
      let value = addOnsData.month[key];
      checkboxEle.value = value;
      checkboxEle.nextElementSibling.lastElementChild.textContent = `+$${value}/mo`;
    }
  }
  calculateAmount();
};
plansSwitchBtn.addEventListener("change", toggleAmount);

const addOnsData = {
  month: {
    "online-service": 1,
    storage: 2,
    profile: 2,
  },
  year: {
    "online-service": 10,
    storage: 20,
    profile: 20,
  },
};

const plansData = {
  year: {
    "plan-arcade": 90,
    "plan-advanced": 120,
    "plan-pro": 150,
  },
  month: {
    "plan-arcade": 9,
    "plan-advanced": 12,
    "plan-pro": 15,
  },
};

function validate() {
  let isValid = true;
  if (userName.value == "") {
    userName.previousElementSibling.lastElementChild.textContent =
      "Name can not be empty";
    userName.focus();
    userName.classList.add("border-[var(--strawberry-red)]");
    isValid = false;
  } else {
    userName.previousElementSibling.lastElementChild.textContent = "";
    userName.classList.remove("border-[var(--strawberry-red)]");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.value)) {
    email.previousElementSibling.lastElementChild.textContent =
      "Please enter a correct email ID";
    email.focus();
    email.classList.add("border-[var(--strawberry-red)]");
    isValid = false;
  } else {
    email.classList.remove("border-[var(--strawberry-red)]");
    email.previousElementSibling.lastElementChild.textContent = "";
  }

  if (!/^\d+$/.test(phone.value) || phone.value.length != 10) {
    phone.previousElementSibling.lastElementChild.textContent =
      "Please enter valid phone number";
    isValid = false;
    phone.classList.add("border-[var(--strawberry-red)]");
    phone.focus();
  } else {
    phone.classList.remove("border-[var(--strawberry-red)]");
    phone.previousElementSibling.lastElementChild.textContent = "";
  }
  return isValid;
}

let step = 1;

function calculateAmount() {
  let totalAmount = 0;
  const selectedPlan = document.querySelector("input[type=radio]:checked");
  const selectedPlanAmount = document.getElementById("selected-plan-amount");
  const finalPlanHeading = document.getElementById("final-plan-heading");
  let planDuration = plansSwitchBtn.checked ? "yr" : "mo";
  selectedPlanAmount.textContent = `$${selectedPlan.value}/${planDuration}`;
  const ul = document.querySelector("ul");
  let selectedAddOns = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  ul.previousElementSibling.hidden = true;
  if (selectedAddOns.length > 0) {
    ul.previousElementSibling.hidden = false;
  }

  finalPlanHeading.textContent = `${selectedPlan.dataset.planName} (${
    plansSwitchBtn.checked ? "Yearly" : "Monthly"
  })`;

  ul.textContent = "";
  totalAmount += parseInt(selectedPlan.value);
  selectedAddOns.forEach((checkedEle) => {
    if (checkedEle.id != "plans-switch") {
      let li = document.createElement("li");
      li.classList.add("flex", "justify-between", "m-2");
      totalAmount += parseInt(checkedEle.value);
      li.innerHTML = `<span>${checkedEle.dataset.addOnName}</span> <span>$${checkedEle.value}/${planDuration}</span>`;
      ul.appendChild(li);
    }
  });

  const totalContainer = document.getElementById("total-amount-container");
  totalContainer.lastElementChild.textContent = `+$${totalAmount}/${planDuration}`;
  totalContainer.firstElementChild.textContent = `Total (per ${
    plansSwitchBtn.checked ? "year" : "month"
  })`;
  //   console.log(selectedPlan, plansSwitchBtn.checked ? "year" : "month");
}

function handleClick(value, e) {
  e.preventDefault();
  // if (!validate()) return;
  const btnSection = document.querySelector("#buttonsSection");

  if (step == 4 && value == 1) {
    btnSection.hidden = true;
    let currentSection = document.getElementById(`section${step}`);
    currentSection.hidden = true;
    step++;
    currentSection = document.getElementById(`section${step}`);
    currentSection.hidden = false;
  }
  if ((step < 4 && value == 1) || (value == -1 && step > 1)) {
    let currentStep = document.getElementById(`step${step}`);
    let currentSection = document.getElementById(`section${step}`);
    currentStep.classList.remove("bg-[var(--light-blue)]", "text-black");
    console.log(currentSection);

    currentSection.hidden = true;

    step += parseInt(value);
    currentStep = document.getElementById(`step${step}`);
    currentSection = document.getElementById(`section${step}`);

    // currentStep.classList.remove("bg-[var(--light-blue)]", "text-black");
    currentStep.classList.add("bg-[var(--light-blue)]", "text-black");
    currentSection.hidden = false;
  }
  if (step != 1) {
    btnSection.firstElementChild.classList.remove("invisible");
  } else {
    btnSection.firstElementChild.classList.add("invisible");
  }
  toggleAmount();
  calculateAmount();
}
prevBtn.addEventListener("click", (e) => {
  e.preventDefault;
  handleClick(-1, e);
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleClick(1, e);
});
