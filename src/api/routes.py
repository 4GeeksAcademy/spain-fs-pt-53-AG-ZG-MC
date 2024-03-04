"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.models import db, User, Event, Signedup_events, Favorite_events
from api.utils import generate_sitemap, APIException
from sqlalchemy import func
from flask_cors import CORS
import json
import re 

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/api/hello', methods=['GET'])
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

# Endpoint para crear un nuevo usuario
@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        if "username" not in data or "email" not in data or "password" not in data:
            return jsonify({"message": "Missing required fields"}), 400
        
        # Validar el formato del correo electrónico utilizando expresiones regulares
        email = data["email"]
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"message": "Invalid email format"}), 400

        user = User(
            username=data["username"],
            email=data["email"],
            password=User.generate_password_hash(data["password"]),
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            followed_users=data.get("followed_users", 0),
            users_following_me=data.get("users_following_me", 0),
        )
        user.save()

        return jsonify(user.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener información de un usuario específico
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para actualizar información de un usuario específico
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            if "username" in data:
                user.username = data["username"]
            if "email" in data:
                # Validar el formato del correo electrónico
                email = data["email"]
                if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                    return jsonify({"message": "Invalid email format"}), 400
                user.email = email
            if "password" in data:
                user.password = User.generate_password_hash(data["password"])
            if "first_name" in data:
                user.first_name = data["first_name"]
            if "last_name" in data:
                user.last_name = data["last_name"]
            if "followed_users" in data:
                user.followed_users = data["followed_users"]
            if "users_following_me" in data:
                user.users_following_me = data["users_following_me"]

            user.save()

            return jsonify(user.serialize()), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para eliminar un usuario específico
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            user.delete()

            return jsonify({"message": "User deleted"}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para crear un nuevo evento
@api.route('/events', methods=['POST'])
def create_event():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        if "name" not in data or "date" not in data or "location" not in data:
            return jsonify({"message": "Missing required fields"}), 400

        # Validar el formato del correo electrónico si se proporciona
        if "email" in data:
            email = data["email"]
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return jsonify({"message": "Invalid email format"}), 400

        event = Event(
            name=data["name"],
            date=data["date"],
            location=data["location"],
            description=data.get("description", ""),
            user_id=data.get("user_id", 0),
        )
        event.save()

        return jsonify(event.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener información de un evento específico
@api.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            return jsonify(event.serialize()), 200
        else:
            return jsonify({"message": "Event not found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
    
# Endpoint para obtener los eventos
@api.route('/events', methods=['GET'])
def get_events():
    try:
        # Parámetros de paginación
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # Consulta paginada en la base de datos
        events = Event.query.paginate(page=page, per_page=per_page)

        # Devolver resultados paginados
        return jsonify({
            'events': [event.serialize() for event in events.items],
            'total_events': events.total,
            'total_pages': events.pages,
            'current_page': events.page,
            'next_page': events.next_num if events.has_next else None,
            'prev_page': events.prev_num if events.has_prev else None
        }), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para actualizar información de un evento específico
@api.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        data = request.get_json()
        event = Event.query.get(event_id)
        if event:
            if "name" in data:
                event.name = data["name"]
            if "date" in data:
                event.date = data["date"]
            if "location" in data:
                event.location = data["location"]
            if "description" in data:
                event.description = data["description"]
            if "user_id" in data:
                event.user_id = data["user_id"]

            event.save()

            return jsonify(event.serialize()), 200
        else:
            return jsonify({"message": "Event not found"}), 404

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para eliminar un evento específico
@api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            event.delete()

            return jsonify({"message": "Event deleted"}), 200
        else:
            return jsonify({"message": "Event not found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para que un usuario se inscriba en un evento
@api.route('/events/<int:event_id>/signup', methods=['POST'])
def signup_event(event_id):
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided"}), 400

        # Validar la presencia del campo "user_id"
        if "user_id" not in data:
            return jsonify({"message": "Missing user_id field"}), 400

        # Validar que "user_id" sea un entero válido
        user_id = data.get("user_id")
        if not isinstance(user_id, int):
            return jsonify({"message": "User ID must be an integer"}), 400

        signedup_event = Signedup_events(
            user_id=user_id,
            event_id=event_id
        )
        signedup_event.save()

        return jsonify(signedup_event.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para que un usuario cancele su inscripción a un evento
@api.route('/users/<int:user_id>/events/<int:event_id>/signup', methods=['DELETE'])
def cancel_signup_for_event(user_id, event_id):
    try:
        # Verificar si el usuario y el evento existen
        user = User.query.get(user_id)
        event = Event.query.get(event_id)
        if not user:
            return jsonify({"message": "User not found"}), 404
        if not event:
            return jsonify({"message": "Event not found"}), 404

        # Verificar si el usuario está inscrito en el evento
        signup = Signedup_events.query.filter_by(user_id=user_id, event_id=event_id).first()
        if not signup:
            return jsonify({"message": "User is not signed up for this event"}), 400

        # Eliminar la inscripción
        signup.delete()

        return jsonify({"message": "Signup canceled successfully"}), 200

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener todos los eventos a los que un usuario está inscrito
@api.route('/users/<int:user_id>/events', methods=['GET'])
def get_user_events(user_id):
    try:
        # Buscar eventos inscritos por el usuario
        user_events = Event.query.join(Signedup_events, Event.id == Signedup_events.event_id).filter(Signedup_events.user_id == user_id).all()

        # Serializar los eventos encontrados
        serialized_events = [event.serialize() for event in user_events]

        return jsonify(serialized_events), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener todos los usuarios inscritos en un evento específico
@api.route('/events/<int:event_id>/users', methods=['GET'])
def get_event_users(event_id):
    try:
        # Buscar usuarios inscritos en el evento
        event_users = User.query.join(Signedup_events, User.id == Signedup_events.user_id).filter(Signedup_events.event_id == event_id).all()

        # Serializar los usuarios encontrados
        serialized_users = [user.serialize() for user in event_users]

        return jsonify(serialized_users), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
    
# Endpoint para agregar un evento a la lista de eventos favoritos de un usuario
@api.route('/users/<int:user_id>/events/<int:event_id>/favorite', methods=['POST'])
def add_event_to_favorites(user_id, event_id):
    try:
        # Verificar si el usuario y el evento existen
        user = User.query.get(user_id)
        event = Event.query.get(event_id)
        if not user:
            return jsonify({"message": "User not found"}), 404
        if not event:
            return jsonify({"message": "Event not found"}), 404

        # Verificar si el evento ya está en la lista de favoritos del usuario
        if Favorite_events.query.filter_by(user_id=user_id, event_id=event_id).first():
            return jsonify({"message": "Event already in user's favorite list"}), 400

        # Agregar el evento a la lista de favoritos del usuario
        favorite_event = Favorite_events(user_id=user_id, event_id=event_id)
        favorite_event.save()

        return jsonify(favorite_event.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para eliminar un evento de la lista de eventos favoritos de un usuario
@api.route('/users/<int:user_id>/events/<int:event_id>/favorite', methods=['DELETE'])
def remove_event_from_favorites(user_id, event_id):
    try:
        # Verificar si el evento favorito existe
        favorite_event = Favorite_events.query.filter_by(user_id=user_id, event_id=event_id).first()
        if not favorite_event:
            return jsonify({"message": "Favorite event not found"}), 404

        # Eliminar el evento de la lista de eventos favoritos del usuario
        favorite_event.delete()

        return jsonify({"message": "Favorite event removed"}), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener todos los eventos favoritos de un usuario
@api.route('/users/<int:user_id>/favorite_events', methods=['GET'])
def get_user_favorite_events(user_id):
    try:
        # Obtener todos los eventos favoritos de un usuario
        user_favorite_events = Favorite_events.query.filter_by(user_id=user_id).all()
        favorite_events = [favorite_event.serialize() for favorite_event in user_favorite_events]
        return jsonify(favorite_events), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para buscar eventos por nombre, lugar, tipo, etc.
@api.route('/events/search', methods=['GET'])
def search_events():
    try:
        # Obtener parámetros de búsqueda
        query_parameters = request.args

        # Verificar si se proporciona un término de búsqueda
        search_term = query_parameters.get('q')
        if not search_term:
            return jsonify({"message": "No search term provided"}), 400

        # Realizar la búsqueda de eventos por nombre
        search_results = Event.query.filter(Event.name.ilike(f'%{search_term}%')).all()
        events = [event.serialize() for event in search_results]
        return jsonify(events), 200

    except Exception as e:
            return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para filtrar eventos por fecha, duración, precio, etc.
@api.route('/events/filter', methods=['GET'])
def filter_events():
    try:
        # Obtener los filtros de la URL
        filters = request.args
        
        # Filtrar eventos según los parámetros proporcionados
        filtered_events = Event.filter_events(filters)

        return jsonify([event.serialize() for event in filtered_events]), 200

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
    
# Endpoint para obtener eventos populares o recomendados
@api.route('/events/recommended', methods=['GET'])
def get_recommended_events():
    try:
        # Obtenemos los eventos más populares en función del número de inscripciones
        recommended_events = db.session.query(Event, func.count(Signedup_events.id).label('total_signups')).\
            outerjoin(Signedup_events).group_by(Event.id).\
            order_by(func.count(Signedup_events.id).desc()).limit(10).all()

        # Convertimos los resultados en una lista de diccionarios serializados
        recommended_events_serialized = [{"event": event.serialize(), "total_signups": total} for event, total in recommended_events]

        return jsonify(recommended_events_serialized), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500