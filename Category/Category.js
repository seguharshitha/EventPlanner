const selectedCategory = document.getElementById('selectedCategory');
const categoryOptions = document.querySelectorAll('.category-option');

function updateSelectedCategory() {
  const selectedOptions = Array.from(categoryOptions).filter(option => option.checked);

  if (!selectedOptions.length) {
    selectedCategory.innerHTML = '<b>Select the Category</b>';
    return;
  }

  const labelText = selectedOptions
    .map(option => option.nextElementSibling?.textContent?.trim() || option.value)
    .join(', ');

  selectedCategory.innerHTML = `<b>${labelText}</b>`;
}

categoryOptions.forEach(option => {
  option.addEventListener('change', updateSelectedCategory);
});

updateSelectedCategory();

