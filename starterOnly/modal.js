function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// list of all validation constraints depending on the type, condition must return a Boolean
const constraints = [
  {
    type: "text",
    condition: function(input) {
      let regex = new RegExp("[a-zA-Z]{2,}");
      return regex.test(input.value);
    },
    error: "Veuillez entrer 2 caractères ou plus pour ce champ"
  },
  {
    type: "email",
    condition: function(input) {
      return input.validity.valid;
    },
    error: "Veuillez entrer une adresse email valide"
  },
  {
    type: "date",
    condition: function(input) {
      return input.value !== "";
    },
    error: "Vous devez entrer votre date de naissance."
  },
  {
    type: "number",
    condition: function(input) {
      let inputValue = parseInt(input.value);
      return !isNaN(inputValue) && inputValue >= 0;
    },
    error: "Vous devez entrer un nombre"
  },
  {
    type: "radio",
    condition: function(input) {
      return input.validity.valid;
    },
    error: "Vous devez choisir une option."
  },
  {
    type: "checkbox",
    condition: function(input) {
      return !input.classList.contains("yes-required") || input.checked;
    },
    error: "Vous devez vérifier que vous acceptez les termes et conditions."
  }
];

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");
const allFormInputs = document.querySelectorAll("form .formData input");

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
// close modal event
closeModalBtn.forEach(btn => btn.addEventListener("click", closeModal));
// validate after input
allFormInputs.forEach(input => input.addEventListener("input", validateForm));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  event.stopPropagation();
  modalbg.style.display = "none";
}

//validate the form
function validate() {
  event.preventDefault();
  resetErrorMessages();
  allFormInputs.forEach(input => validateInput(input));
}

//remove error messages and the red border
function resetErrorMessages() {
  let allErrorMessages = document.querySelectorAll("span[data-error]");
  allErrorMessages.forEach(element => element.remove());
  let allErrorVisible = document.querySelectorAll(
    ".formData[data-error-visible='true']"
  );
  allErrorVisible.forEach(element =>
    element.setAttribute("data-error-visible", "false")
  );
}

function addErrorMessage(input, errorMessage) {
  input.parentNode.setAttribute("data-error-visible", "true");
  const error = document.createElement("span");
  error.setAttribute("data-error", errorMessage);
  input.insertAdjacentElement("afterend", error);
}

//compare the input to the constraint in the list, if there is no constraint for the type it won't do anything
function validateInput(input) {
  const constraint = constraints.find(element => element.type === input.type);
  if (constraint) {
    const condition = constraint.condition;
    if (!condition(input)) {
      addErrorMessage(input, constraint.error);
    }
  }
}
