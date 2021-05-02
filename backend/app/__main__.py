import fire
from configue import load_config_from_file


class CLI:
    """
        >>> python -m app --help
    """

    def flask(self, config_path: str):
        return self._run_command(config_path, "run_flask")

    @staticmethod
    def _run_command(config_path: str, command_name: str):
        config_dict = load_config_from_file(config_path)
        command = config_dict[command_name]
        command.run()


if __name__ == "__main__":
    fire.Fire(CLI)
