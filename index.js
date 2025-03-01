const nextBtn = document.getElementById("nextBtn");
const stepsSideBar = document.getElementById("steps-side-bar");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

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
function handleNextClick(e) {
  e.preventDefault();
//   if (!validate()) return;
  if (step < 4) {
    let currentStep = document.getElementById(`step${step}`);
    let currentSection = document.getElementById(`section${step}`);
    currentStep.classList.remove("bg-[var(--light-blue)]", "text-black");
    console.log(currentSection);

    currentSection.hidden = true;

    step++;
    currentStep = document.getElementById(`step${step}`);
    currentSection = document.getElementById(`section${step}`);

    currentStep.classList.remove("bg-[var(--light-blue)]", "text-black");
    currentStep.classList.add("bg-[var(--light-blue)]", "text-black");
    currentSection.hidden = false;
  }
}

nextBtn.addEventListener("click", handleNextClick);
