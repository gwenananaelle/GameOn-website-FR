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

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  event.stopPropagation();
  modalbg.style.display = "none";
}

/**
 * add input event to all input elements with the formData class, and trigger the getElementValidation function
 */
allFormInputs.forEach(element =>
  element.addEventListener("input", function() {
    getElementValidation(element);
  })
);
/**
 * reset error message, check the input, if false create error message and return false
 * @param {Node} element
 * @return {Boolean}
 */
function getElementValidation(element) {
  resetErrorMessages(element);
  if (!isValidInput(element)) {
    addErrorMessage(element);
    return false;
  }
  return true;
}

/**
 * onSubmit form, check if the form is valid
 */
function validate() {
  event.preventDefault();
  let isFormValid = true;
  allFormInputs.forEach(element => {
    if (!getElementValidation(element)) {
      isFormValid = false;
      return false;
    }
  });
  if (isFormValid) {
    submitFormData();
    showConfirmationMessage();
  }
}

/**
 * if Error message remove it
 * @param {Node} element
 */
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

/**
 * create an error message by setting attribute data-error-visible to true and creating a span sibling element with the data-error class
 * @param {Node} element
 */
function addErrorMessage(element) {
  element.parentNode.setAttribute("data-error-visible", "true");
  const error = document.createElement("span");
  const constraint = constraints.find(elmt => elmt.type === element.type);
  error.setAttribute("data-error", constraint.error);
  element.insertAdjacentElement("afterend", error);
}

/**
 * check the input with the constraint of for the same input type
 * @param {Node} element
 * @return {Boolean}
 */
function isValidInput(element) {
  const constraint = constraints.find(elmt => elmt.type === element.type);
  if (constraint) {
    const condition = constraint.condition;
    return condition(element);
  }
}

/**
 * change the HTML content for modalBody to show the confirmation message
 */
function showConfirmationMessage() {
  let modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "<p>Merci ! Votre réservation a été reçue.</p>";
}

/**
 * send object FormData to a mock url
 */
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
