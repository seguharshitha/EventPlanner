function toggleDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
  }

  window.addEventListener("click", function(event) {
    document.querySelectorAll(".dropdown-container").forEach(function(dropdown) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  });