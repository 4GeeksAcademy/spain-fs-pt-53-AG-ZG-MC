"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager, create_access_token
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS


# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Configura la extensión Flask-JWT-Extended
app.config["JWT_SECRET_KEY"] = "xS5j#8Fp@L2n!9G"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400  # 24 horas en segundos
jwt = JWTManager(app)

# PREGUNTAR
# Manejo de errores relacionados con la autenticación
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({"message": "Missing Authorization Header"}), 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return jsonify({"message": "Invalid Token"}), 401

@jwt.expired_token_loader
def expired_token_response(callback):
    return jsonify({"message": "Expired Token"}), 401

# Endpoint para generar tokens
@app.route("/auth", methods=["POST"])
def create_token():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)

        if not username or not password:
            return jsonify({"msg": "Missing username or password"}), 400

        # Consulta la base de datos por el nombre de usuario
        user = User.query.filter_by(username=username).first()

        if user is None or not user.check_password(password):
            return jsonify({"msg": "Bad username or password"}), 401

        # Crea un nuevo token con el id de usuario dentro
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id })

    except Exception as e:
        return jsonify({"msg": f"Internal server error: {str(e)}"}), 500

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
