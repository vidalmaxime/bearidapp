from setuptools import setup

setup(
    name="dlcplugnplay",
    description="DLC Plug-n-Play",
    author="Maxime Vidal",
    packages=["app"],
    install_requires=[
        "fire==0.3.1",
        "flask==1.1.2",
        "flask-cors==3.0.9",
        "configue==3.0.3",
        "tensorflow==1.15",
        "numpy",
        "matplotlib",
        "deeplabcut",
    ],
    python_requires=">=3.7,<4.0",
)
