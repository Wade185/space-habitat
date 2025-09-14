# environment_init.py

def setup_environment():
    """
    Sets up the initial Mars environment with basic values.
    """
    environment = {
        "oxygen": 21.0,   # % level of oxygen
        "water": 100.0,   # liters available
        "food": 50.0,     # units available
        "temperature": -60, # in Celsius
    }
    print("🌍 Environment setup complete:", environment)
    return environment

