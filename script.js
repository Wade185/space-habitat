// 1. Load planet data from planets.json
fetch("planets.json")
  .then(res => res.json()) // convert the file into JavaScript object
  .then(planets => {       // 'planets' is now an array of all planets
    const list = document.getElementById("planetList");
    const search = document.getElementById("searchBar");

    // 2. Function to display planets (filter optional)
    function display(filter = "") {
      list.innerHTML = "";  // clear previous cards
      planets
        .filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) // search filter
        .forEach(p => { // for each matching planet
          const card = document.createElement("div"); // make a card
          card.className = "card";
          card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" style="width:100%;border-radius:10px;">
            <h3>${p.name}</h3>
            <p>${p.type}</p>
          `;

          // 3. When you click, save the planet to localStorage & go to planet.html
          card.onclick = () => {
            localStorage.setItem("planet", JSON.stringify(p));
            window.location.href = "planet.html";
          };

          // Add card to the list
          list.appendChild(card);
        });
    }

    // 4. Show all planets at first
    display();

    // 5. Update list when typing in search bar
    search.addEventListener("input", e => display(e.target.value));
  });
// ============ Assistant System ============

// Data for each celestial body (can move to JSON later)
const assistantData = {
  "Moon": {
    survival: "Extreme day/night cycles. Radiation protection needed.",
    production: "Solar with batteries. Regolith for shielding.",
    necessities: "Water extraction from regolith. Oxygen from CO₂."
  },
  "Phobos": {
    survival: "Low gravity, unstable surface. Use underground bases.",
    production: "Mining resources. Solar power.",
    necessities: "Small base habitats. Limited sustainability."
  }
  // Add more planets/moons here...
};

// 1. Load planet info from localStorage (saved in index.js part)
const savedPlanet = JSON.parse(localStorage.getItem("planet"));

// 2. When the planet page loads, show its assistant automatically
if (savedPlanet) {
  const name = savedPlanet.name;

  // Fill assistant modal content
  document.getElementById("assistantTitle").textContent = "Assistant " + name;
  const info = assistantData[name] || {};
  document.getElementById("assistantContent").innerHTML = `
    <p><strong>Survival:</strong> ${info.survival || "No data yet."}</p>
    <p><strong>Production:</strong> ${info.production || "No data yet."}</p>
    <p><strong>Necessities:</strong> ${info.necessities || "No data yet."}</p>
  `;

  // Auto-show the assistant modal
  new bootstrap.Modal(document.getElementById("assistantModal")).show();
}
fetch("static/assistantData.json")
  .then(res => res.json())
  .then(assistantData => {
    const savedPlanet = JSON.parse(localStorage.getItem("planet"));
    if (savedPlanet) {
      const name = savedPlanet.name;
      const info = assistantData[name] || {};
      document.getElementById("assistantTitle").textContent = "Assistant " + name;
      document.getElementById("assistantContent").innerHTML = `
        <p><strong>Survival:</strong> ${info.survival || "No data yet."}</p>
        <p><strong>Production:</strong> ${info.production || "No data yet."}</p>
        <p><strong>Necessities:</strong> ${info.necessities || "No data yet."}</p>
      `;
      new bootstrap.Modal(document.getElementById("assistantModal")).show();
    }
  });
