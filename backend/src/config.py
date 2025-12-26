import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL') or os.environ.get('SQLALCHEMY_DATABASE_URI') or os.environ.get('DATABASE_URL') or 'postgresql://user:password@localhost/thesis_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'thesis-system-stable-secret-2025'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
