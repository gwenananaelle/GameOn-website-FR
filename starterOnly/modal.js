function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

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
// there is two validation, one during input and one at validation (submit button), this one is for input
allFormInputs.forEach(element =>
  element.addEventListener("input", function() {
    event.stopPropagation();
    resetErrorMessages(element);
    if (isValidInput(element)) {
    } else {
      addErrorMessage(element);
    }
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

//there is two validation, one during input and one at validation (submit button), this one is for validation
function validate() {
  event.preventDefault();
  let isFormValid = true;
  allFormInputs.forEach(element => {
    resetErrorMessages(element);
    if (!isValidInput(element)) {
      addErrorMessage(element);
      isFormValid = false;
    }
  });
  if (isFormValid) {
    submitFormData();
    showConfirmationMessage();
  }
}

//remove error messages and the red borders
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

//add an error message, is called by isValidInput
function addErrorMessage(element) {
  element.parentNode.setAttribute("data-error-visible", "true");
  const error = document.createElement("span");
  const constraint = constraints.find(elmt => elmt.type === element.type);
  error.setAttribute("data-error", constraint.error);
  element.insertAdjacentElement("afterend", error);
}

//compare the input to the constraint in the list, if there is no constraint for the type it won't do anything
function isValidInput(element) {
  const constraint = constraints.find(elmt => elmt.type === element.type);
  if (constraint) {
    const condition = constraint.condition;
    return condition(element);
  }
}

//confirmationmessage
function showConfirmationMessage() {
  let modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "<p>Merci ! Votre réservation a été reçue.</p>";
}

//submit formData
function submitFormData() {
  var formData = new FormData(document.getElementById("myForm"));
  fetch("https://mockbin.com/request", {
    method: "POST",
    body: formData
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value.postData.params);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
