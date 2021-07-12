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
      return input.value !== "" && input.validity.valid;
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
allFormInputs.forEach(element =>
  element.addEventListener("input", function() {
    event.stopPropagation();
    validateInput(element);
  })
);

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
  allFormInputs.forEach(function callbackFn(element) {
    resetErrorMessages(element);
    validateInput(element);
  });
}

//remove error messages and the red border
function resetErrorMessages(element) {
  let hasFormData =
    element.parentNode && element.parentNode.classList.contains("formData");
  let hasSpanError =
    element.nextElementSibling &&
    element.nextElementSibling.hasAttribute("data-error");
  if (hasFormData) {
    let formData = element.parentNode;
    formData.setAttribute("data-error-visible", "false");
  }
  if (hasSpanError) {
    let spanError = element.nextSibling;
    spanError.remove();
  }
}

function addErrorMessage(element, errorMessage) {
  element.parentNode.setAttribute("data-error-visible", "true");
  const error = document.createElement("span");
  error.setAttribute("data-error", errorMessage);
  element.insertAdjacentElement("afterend", error);
}

//compare the input to the constraint in the list, if there is no constraint for the type it won't do anything
function validateInput(element) {
  const constraint = constraints.find(elmt => elmt.type === element.type);
  if (constraint) {
    const condition = constraint.condition;
    if (!condition(element)) {
      addErrorMessage(element, constraint.error);
    } else {
      resetErrorMessages(element);
    }
  }
}
