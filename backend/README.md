# dlcpnp-backend

## Getting started

Start by creating a virtual environnement.

```bash
virtualenv -p python3.9
```

Install the developper requirements.

```bash
pip install -r dev.requirements.txt 
```

Setup the dependencies
```bash
python -m setup install
```


## API

Flask:
```bash
python -m app flask --config_path config/flask.yml
```
Gunicorn 
```bash
gunicorn "app.api:create_app('config/flask.yml')"  --name backend \
 --bind 0.0.0.0:${GUNICORN_PORT:-4030}  --workers ${GUNICORN_NB_WORKERS:-1}  --log-level=info  --access-logfile '-'
```
Don't forget to change the port variable in the frontend if you switch between flask and gunicorn on your local machine.


## Tests

To run the tests, enter the command below,

```bash
python -m pytest --cov app tests
```

## Lint

```bash
pylint --load-plugins pylint_quotes app
```

