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
