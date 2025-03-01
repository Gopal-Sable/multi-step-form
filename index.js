const nextBtn = document.getElementById("nextBtn");
const stepsSideBar = document.getElementById("steps-side-bar");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const prevBtn = document.getElementById("prevBtn");
const plansSwitchBtn = document.getElementById("plans-switch");

plansSwitchBtn.addEventListener("change", (e) => {
  if (plansSwitchBtn.checked) {
    // checked means year
    for (const key in plansData.year) {
      const inputEle = document.getElementById(key);
      inputEle.value = plansData.year[key];
      let showAmountEle = inputEle.nextElementSibling.lastElementChild;
      showAmountEle.lastElementChild.innerHTML = `$${inputEle.value}/yr`;
    }

    for (const key in addOnsData.year) {
      let checkboxEle = document.getElementById(key);
      let value = addOnsData.year[key];
      checkboxEle.value = value;
      checkboxEle.nextElementSibling.lastElementChild.textContent = `+$${value}/yr`;
    }
  } else {
    for (const key in plansData.month) {
      const inputEle = document.getElementById(key);
      inputEle.value = plansData.month[key];
      let showAmountEle = inputEle.nextElementSibling.lastElementChild;
      showAmountEle.lastElementChild.innerHTML = `$${inputEle.value}/mo`;
    }
    for (const key in addOnsData.month) {
      let checkboxEle = document.getElementById(key);
      let value = addOnsData.month[key];
      checkboxEle.value = value;
      checkboxEle.nextElementSibling.lastElementChild.textContent = `+$${value}/mo`;
    }
  }
  calculateAmount();
});

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
    isValid = false;
  } else {
    userName.previousElementSibling.lastElementChild.textContent = "";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.value)) {
    email.previousElementSibling.lastElementChild.textContent =
      "Please enter a correct email ID";
    email.focus();
    isValid = false;
  } else {
    email.previousElementSibling.lastElementChild.textContent = "";
  }

  if (!/^\d+$/.test(phone.value) || phone.value.length < 10) {
    phone.previousElementSibling.lastElementChild.textContent =
      "Please enter valid phone number";
    isValid = false;
    phone.focus();
  } else {
    phone.previousElementSibling.lastElementChild.textContent = "";
  }
  return isValid;
}

let step = 1;

function calculateAmount() {
  let totalAmount=0;
  const selectedPlan = document.querySelector("input[type=radio]:checked");
  const selectedPlanAmount = document.getElementById("selected-plan-amount");
  let planDuration = plansSwitchBtn.checked ? "yr" : "mo";
  selectedPlanAmount.textContent = `$${selectedPlan.value}/${planDuration}`;
  const ul = document.querySelector("ul");
  let selectedAddOns = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  ul.textContent = "";
  totalAmount += parseInt(selectedPlan.value);
  selectedAddOns.forEach((checkedEle) => {
    if (checkedEle.id != "plans-switch") {
      let li = document.createElement("li");
      li.classList.add("flex", "justify-between");
      totalAmount += parseInt(checkedEle.value);
      li.innerHTML = `<span>${checkedEle.id}</span> <span>$${checkedEle.value}/${planDuration}</span>`;
      ul.appendChild(li);
    }
  });

  const totalContainer = document.getElementById("total-amount-container");
  totalContainer.lastElementChild.textContent = `+$${totalAmount}/${planDuration}`;
  totalContainer.firstElementChild.textContent =`Total (per ${plansSwitchBtn.checked ? "year" : "month"})`
  //   console.log(selectedPlan, plansSwitchBtn.checked ? "year" : "month");
}

function handleClick(value, e) {
  e.preventDefault();
  if (!validate()) return;
  if (step == 4 && value == 1) {
    const btnSection = document.querySelector("#buttonsSection");
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

    currentStep.classList.remove("bg-[var(--light-blue)]", "text-black");
    currentStep.classList.add("bg-[var(--light-blue)]", "text-black");
    currentSection.hidden = false;
  }
}
prevBtn.addEventListener("click", (e) => {
  e.preventDefault;
  handleClick(-1, e);
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleClick(1, e);
});
