from dataclasses import dataclass


@dataclass
class FlaskConfig:
    port: int = None
    host: str = None
    debug: bool = None
    threaded: bool = True
