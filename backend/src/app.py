from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv() # Load .env file

from config import Config
from extensions import db, jwt, cors
from routes import main_bp

app = Flask(__name__)
app.config.from_object(Config)

# Init extensions
db.init_app(app)
jwt.init_app(app)
cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

# Register Blueprints
app.register_blueprint(main_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
