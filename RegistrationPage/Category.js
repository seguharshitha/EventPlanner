var selectorToggle = document.querySelector('.selector');
var listElement = document.querySelector('.list');
var downArrow = document.querySelector('.down-arrow');

if (selectorToggle && listElement && downArrow) {
  selectorToggle.addEventListener('click', ()=>{
    listElement.classList.toggle('show');
    downArrow.classList.toggle('rotate180');
  });
}

var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

// Auto-fill the email field from login storage
(function() {
  var savedEmail = sessionStorage.getItem("loggedInEmail");
  if (savedEmail) {
    var emailField = document.getElementById("Email_id");
    if (emailField) {
      emailField.value = savedEmail;
    }
  }
})();

