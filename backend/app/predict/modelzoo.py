import os

os.environ["DLClight"] = "True"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import deeplabcut
import ruamel.yaml as yaml
from pathlib import Path


# TODO: method to download all models and move/rename them appropriately, e.g.:
# deeplabcut.create_pretrained_project(animal, name, video_path, videotype=videotype, model="full_dog", analyzevideo=False,
#                                                         createlabeledvideo=False)

class ModelZooPredictor:

    def __init__(self):
        self.ProjectFolderName = 'myDLC_modelZoo'
        self.YourName = 'teamDLC'

    def _downsample(self, video):
        # TODO
        pass

    def predict(self, video_path, animal):
        zoo_path = Path(__file__).parent
        rel_path = os.path.join("../..", video_path)
        full_video_path = str((zoo_path / rel_path).resolve())
        print(os.path.dirname(os.path.dirname(full_video_path)))
        videotype = os.path.splitext(video_path)[-1].lstrip('.')
        # video_path = os.path.basename(video_path)
        # path_config_file = deeplabcut.create_pretrained_project(self.ProjectFolderName, self.YourName, video_path, videotype
        #                                                         model=self.model2use, analyzevideo=True,
        #                                                         createlabeledvideo=True,
        #                                                         copy_videos=True)
        config_path = os.path.join("app/models", animal, "config.yaml")
        with open(config_path) as f:
            cfg = yaml.safe_load(f)
        videos_dir = os.path.dirname(full_video_path)
        cfg["project_path"] = os.path.dirname(videos_dir)
        cfg["video_sets"][full_video_path] = cfg["video_sets"].pop(
            list(cfg["video_sets"].keys())[0])
        with open(config_path, 'w') as f:
            yaml.dump(cfg, f)
        # deeplabcut.analyze_videos(config_path, video_path, videotype=videotype)
        # deeplabcut.filterpredictions(config_path, full_video_path, videotype=videotype)
        # deeplabcut.create_labeled_video(config_path, full_video_path, videotype=videotype, filtered=False)
        files = os.listdir(videos_dir)
        for file in files:
            if file.endswith("labeled." + videotype):
                labeled_video_path = os.path.join(videos_dir, file)
        return labeled_video_path
