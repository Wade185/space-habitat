# main.py
# Entry point of the Mars Sustainability Simulation Project

from simulation_init import run_simulation
from environment_init import setup_environment
from ai_init import MarsAI
from dashboard_init import start_dashboard

def main():
    print("🚀 Starting Mars Life Simulation Project...")

    # Step 1: Setup environment
    environment = setup_environment()

    # Step 2: Initialize AI system
    ai = MarsAI(environment)

    # Step 3: Run simulation
    results = run_simulation(ai, environment)

    # Step 4: Start dashboard (later will be visual)
    start_dashboard(results)

    print("✅ Simulation complete!")

if __name__ == "__main__":
    main()
