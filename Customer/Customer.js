function toggleDropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("dropdown");
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

function updateSelectedAreas() {
    const selectedAreasContainer = document.getElementById("selectedAreas");
    const dropdownButton = document.getElementById("areaDropdownButton");
    const selectedValues = Array.from(document.querySelectorAll(".area-option:checked")).map(function (checkbox) {
        return checkbox.value;
    });

    if (selectedValues.length === 0) {
        selectedAreasContainer.textContent = "Selected: ";
        //dropdownButton.textContent = "Area";
        return;
    }

    selectedAreasContainer.textContent = "Selected: " + selectedValues.join(", ");
    //dropdownButton.textContent = "Area: " + selectedValues.join(", ");
}

document.querySelectorAll(".area-option").forEach(function (checkbox) {
    checkbox.addEventListener("change", updateSelectedAreas);
});

updateSelectedAreas();