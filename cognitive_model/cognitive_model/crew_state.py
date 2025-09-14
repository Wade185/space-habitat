# cognitive_model/crew_state.py
"""
Starter cognitive model for crew mental state on Mars.

Notes on inputs:
- o2: either a fraction (1.0 = normal Earth-level) or a percent (e.g., 21.0). The code auto-normalizes.
- food_ratio: preferred as fraction 0..1. If you pass an absolute number (e.g., 50), it will normalize using baseline_food.
- light: absolute light units (use values from your environment model).
- isolation_factor: numeric (days in isolation or similar).
"""

class CrewState:
    def __init__(self, crew_size: int = 4, baseline_food: float = 50.0):
        self.crew_size = crew_size
        self.baseline_food = baseline_food

        # internal state variables (0..100 scale)
        self.stress = 20.0
        self.cognitive = 95.0
        self.mood = 75.0
        self.sleep_quality = 80.0

    def _normalize_o2(self, o2):
        # Accept either fraction (1.0) or percent (21.0). Return fraction.
        if o2 is None:
            return 1.0
        o2 = float(o2)
        if o2 > 2.0:
            # assume percent (e.g., 21.0)
            return o2 / 21.0
        return o2

    def _normalize_food(self, food):
        # Accept fraction 0..1 or absolute (e.g., 50 units). Return fraction 0..1.
        if food is None:
            return 1.0
        f = float(food)
        if f > 1.5:
            return min(1.0, f / self.baseline_food)
        return max(0.0, min(1.0, f))

    def step(self, o2, food_ratio, light, isolation_factor: float = 0.0):
        """
        Update the crew internal state for a single simulation step.

        Inputs:
        - o2: fraction (1.0 = normal) OR percent (21.0)
        - food_ratio: fraction 0..1 (or absolute units >1 will be normalized by baseline_food)
        - light: absolute light value from environment
        - isolation_factor: numeric (days or similar)
        """
        o2_rel = self._normalize_o2(o2)
        food_frac = self._normalize_food(food_ratio)

        # oxygen effect (hypoxia harms cognition & raises stress)
        if o2_rel < 0.95:
            delta = 0.95 - o2_rel
            self.cognitive -= delta * 50.0
            self.stress += delta * 30.0

        # food effect (low food reduces mood & raises stress)
        if food_frac < 0.9:
            delta_food = 0.9 - food_frac
            self.mood -= delta_food * 40.0
            self.stress += delta_food * 20.0

        # light influences sleep quality (ideal light ≈ 600 units - tune later)
        ideal_light = 600.0
        light_diff = abs(light - ideal_light)
        self.sleep_quality -= (light_diff / (ideal_light + 1e-6)) * 5.0

        # isolation slowly increases stress
        self.stress += min(5.0, isolation_factor * 0.2)

        # small natural adjustments/recovery
        self.mood = max(0.0, min(100.0, self.mood + 0.01 * (100.0 - self.stress)))
        self.cognitive = max(0.0, min(100.0, self.cognitive + 0.01 * (self.mood - 50.0)))
        self.sleep_quality = max(0.0, min(100.0, self.sleep_quality))
        self.stress = max(0.0, min(100.0, self.stress))

    def to_dict(self):
        "Return current internal state as a dictionary."
        return {
            "crew_size": self.crew_size,
            "stress": round(self.stress, 3),
            "cognitive": round(self.cognitive, 3),
            "mood": round(self.mood, 3),
            "sleep_quality": round(self.sleep_quality, 3),
        }
