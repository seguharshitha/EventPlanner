function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("show");
  }

  // Optional: close dropdown if clicked outside
  window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });