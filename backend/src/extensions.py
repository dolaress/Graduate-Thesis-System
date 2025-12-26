from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()

# JWT Error Handlers
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return {"error": "Missing Authorization Header"}, 401

@jwt.invalid_token_loader
def invalid_token_callback(callback):
    # Print to console for debugging
    print(f"Invalid Token: {callback}")
    return {"error": f"Invalid Token: {callback}"}, 422

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {"error": "Token has expired"}, 401
