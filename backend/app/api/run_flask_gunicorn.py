from configue import load_config_from_file
from flask import Flask


def create_app(config_path: str) -> Flask:
    """Create the Flask app object and return it (without starting the app).
    Entry point for gunicorn
    """
    config = load_config_from_file(config_path)
    command = config["run_flask"]
    return command.run(start=False)
