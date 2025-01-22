from blade.api import create_app
from blade.api.config.config import config_dict


app=create_app(config=config_dict['prod'])

if __name__ == "__main__":
    app.run()
