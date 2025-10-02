const data = {
  "aegaeon": {
    discovery: "2008, Cassini spacecraft",
    parent: "Saturn",
    size: "~0.5 km radius",
    distance: "1.2 billion km",
    fact: "Saturn’s smallest named moon, helps maintain the G ring."
  },
  "phobos": {
    discovery: "1877, Asaph Hall",
    parent: "Mars",
    size: "22 km",
    distance: "77 million km (at opposition)",
    fact: "Orbits Mars so fast it rises and sets twice a day!"
  }
  // ... all 76 bodies here
};

class HabitatAssistant {
  static initAssistant(planet) {
    return new HabitatAssistant(planet);
  }

  constructor(planet) {
    this.planet = planet;
    this.info = data[planet];
  }

  bindToInput(inputSel, buttonSel, outputSel) {
    const input = document.querySelector(inputSel);
    const button = document.querySelector(buttonSel);
    const output = document.querySelector(outputSel);

    button.addEventListener("click", () => {
      const question = input.value.toLowerCase();
      let answer = "Sorry, I don’t know that.";

      if (question.includes("discover")) answer = this.info.discovery;
      else if (question.includes("parent") || question.includes("planet")) answer = this.info.parent;
      else if (question.includes("size") || question.includes("big")) answer = this.info.size;
      else if (question.includes("distance")) answer = this.info.distance;
      else if (question.includes("fact") || question.includes("special")) answer = this.info.fact;

      output.innerHTML = `<p>${answer}</p>`;
    });
  }
}
