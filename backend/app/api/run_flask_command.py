import logging
import os

from app.config import FlaskConfig
from app.predict.modelzoo import ModelZooPredictor
from flask import Flask, request, send_file, jsonify, url_for
from flask_cors import CORS

os.environ["DLClight"] = "True"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


class RunFlaskCommand:
    logger = logging.getLogger(__name__)

    def __init__(self, flask_config: FlaskConfig, predictor: ModelZooPredictor):
        self.predictor = predictor
        self.flask_config = flask_config

    def predict(self):
        """Runs Zoo Model on video
        """

        animal = list(request.files.to_dict().keys())[0]
        user_file = request.files[animal]
        video_path = os.path.join("app/models", animal, "videos", user_file.filename)
        user_file.save(video_path)

        # video_name = user_request[0].get("name")
        # user_video = user_request9[0].get("query") or ""
        labeled_video_path = self.predictor.predict(
            video_path,
            animal
        )
        print("sending file...")
        return send_file(labeled_video_path) #, as_attachment=True)
        # return jsonify({
        #     "results": labeled_video_path
        # })
    # SEND PATH TO FILE OR FILE DIRECTLY ?

    def run(self, start=True):
        app = Flask(__name__, static_folder=None)
        CORS(app)
        app.add_url_rule("/predict", "load_video", self.predict, methods=["POST"])

        if start:
            app.run(port=self.flask_config.port, host=self.flask_config.host, debug=self.flask_config.debug,
                    threaded=self.flask_config.threaded)
        return app
