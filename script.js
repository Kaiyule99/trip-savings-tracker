const trackers = [
  {
    name: "Bday ni Bub",
    emoji: "🎂",
    goalAmount: 10000,
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-10-01"),
    containerId: "bub-tracker"
  },
  {
    name: "Boracay",
    emoji: "🌴",
    goalAmount: 30000,
    startDate: new Date("2024-11-01"), // updated start
    endDate: new Date("2025-06-01"),   // updated end
    containerId: "boracay-tracker"
  },
  {
    name: "Taiwan",
    emoji: "✈️",
    goalAmount: 50000,
    startDate: new Date("2025-12-01"),
    endDate: new Date("2026-12-01"),
    containerId: "taiwan-tracker"
  }
];

trackers.forEach(tracker => {
  let currentSaved = 0;

  const container = document.getElementById(tracker.containerId);

  const title = document.createElement("h1");
  title.textContent = `${tracker.emoji} ${tracker.name} Tracker`;
  container.appendChild(title);

  const goalDisplay = document.createElement("p");
  goalDisplay.innerHTML = `Goal: ₱<span id="${tracker.containerId}-goal">${tracker.goalAmount}</span>`;
  container.appendChild(goalDisplay);

  const paidDisplay = document.createElement("p");
  paidDisplay.innerHTML = `Amount Paid So Far: ₱<span id="${tracker.containerId}-paid">0</span>`;
  container.appendChild(paidDisplay);

  const remainingDisplay = document.createElement("p");
  remainingDisplay.innerHTML = `Remaining: ₱<span id="${tracker.containerId}-remaining">${tracker.goalAmount}</span>`;
  container.appendChild(remainingDisplay);

  // 🟦 Add progress bar
  const progressBarContainer = document.createElement("div");
  progressBarContainer.classList.add("progress-bar-container");

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");

  progressBarContainer.appendChild(progressBar);
  container.appendChild(progressBarContainer);

  const checkboxContainer = document.createElement("div");
  container.appendChild(checkboxContainer);

  const months = [];
  const current = new Date(tracker.startDate);
  const end = new Date(tracker.endDate);

  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  const amountPerMonth = tracker.goalAmount / months.length;

  months.forEach((date, index) => {
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = amountPerMonth.toFixed(2);
    checkbox.id = `${tracker.containerId}-month-${index}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = `${monthYear}: ₱${amountPerMonth.toFixed(2)}`;

    const wrapper = document.createElement("div");
    wrapper.classList.add("checkbox-wrapper");
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    // Restore checkbox state from localStorage
    const savedState = localStorage.getItem(checkbox.id);
    if (savedState === "true") {
      checkbox.checked = true;
      currentSaved += parseFloat(checkbox.value);
    }

    // Save state on change
    checkbox.addEventListener("change", () => {
      localStorage.setItem(checkbox.id, checkbox.checked);
      if (checkbox.checked) {
        currentSaved += parseFloat(checkbox.value);
      } else {
        currentSaved -= parseFloat(checkbox.value);
      }
      updateDisplays();
    });

    checkboxContainer.appendChild(wrapper);
  });

  function updateDisplays() {
    document.getElementById(`${tracker.containerId}-paid`).textContent = currentSaved.toFixed(2);
    document.getElementById(`${tracker.containerId}-remaining`).textContent = (tracker.goalAmount - currentSaved).toFixed(2);
    progressBar.style.width = `${(currentSaved / tracker.goalAmount) * 100}%`;
  }

  updateDisplays(); // Initial update
});
