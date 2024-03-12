"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
import json

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    try:
        response_body = {
            "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
        }
        response = make_response(json.dumps(response_body), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Content-Type'] = 'application/json'
        return response
    except Exception as e:
        response_body = {
            "error": str(e)
        }
        response = make_response(json.dumps(response_body), 500)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Content-Type'] = 'application/json'
        return response
    
    