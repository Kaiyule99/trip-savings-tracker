window.onload = function () {
  const goalAmount = 10000;
  let currentSaved = 0;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const checkboxContainer = document.getElementById("checkboxes");
  const remainingDisplay = document.getElementById("remaining-amount");
  const paidDisplay = document.getElementById("paid-amount");

  months.forEach((month, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "checkbox-wrapper";

    const label = document.createElement("label");
    label.textContent = `${month}: ₱1,000`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = 1000;
    checkbox.id = `month-${i + 1}`;

    checkbox.addEventListener("change", () => {
      currentSaved += checkbox.checked ? 1000 : -1000;
      updateDisplay();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(checkbox);
    checkboxContainer.appendChild(wrapper);
  });

  function updateDisplay() {
    remainingDisplay.textContent = goalAmount - currentSaved;
    paidDisplay.textContent = currentSaved;
  }
};
