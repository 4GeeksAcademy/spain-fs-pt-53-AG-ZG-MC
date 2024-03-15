"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.models import db, User, Event, Signedup_event, Favorite_event
from api.utils import generate_sitemap, APIException
from sqlalchemy import func
from flask_cors import CORS
from flask_jwt_extended import jwt_required
from api.email_utils import send_password_reset_email
import secrets
from datetime import datetime, timedelta, timezone
import json
import re 

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

# Endpoint para crear un nuevo usuario
@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        if not data:
            print("No data provided")
            return jsonify({"message": "No data provided"}), 400

        if "username" not in data or "email" not in data or "password" not in data:
            print("Missing required fields")
            return jsonify({"message": "Missing required fields"}), 400
        
        # Validar el formato del correo electrónico utilizando expresiones regulares
        email = data["email"]
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            print("Invalid email format")
            return jsonify({"message": "Invalid email format"}), 400

        # Validar la contraseña
        password = data["password"]
        if len(password) < 8:
            print("Password must be at least 8 characters long.")
            return jsonify({"message": "Password must be at least 8 characters long."}), 400
        if not re.search(r"[A-Z]", password):
            print("Password must contain at least one uppercase letter.")
            return jsonify({"message": "Password must contain at least one uppercase letter."}), 400
        if not re.search(r"\d", password):
            print("Password must contain at least one digit.")
            return jsonify({"message": "Password must contain at least one digit."}), 400
        if not re.search(r"[!@#$%^&*]", password):
            print("Password must contain at least one special character.")
            return jsonify({"message": "Password must contain at least one special character."}), 400

        print("Received data:", data)

        user = User(
            username=data["username"],
            email=data["email"],
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            followed_users=data.get("followed_users", 0),
            users_following_me=data.get("users_following_me", 0),
        )
        user.set_password_hash(password)
        user.save()

        print("User created:", user.serialize())

        return jsonify(user.serialize()), 201

    except ValueError as ve:
        print("Error:", ve)
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        print("Internal Server Error:", e)
        return jsonify({"message": "Internal Server Error"}), 500
    
# ADMI - Endpoint para obtener todos los usuarios con información sobre los eventos creados por cada uno
@api.route('/users', methods=['GET'])
# @jwt_required()
def get_all_users():
    try:
        users = User.query.all()
        if users:
            # Crear una lista para almacenar la información de los usuarios con sus eventos creados
            users_with_events = []

            # Iterar sobre cada usuario y crear un diccionario con su información
            for user in users:
                user_info = user.serialize()

                # Obtener los eventos creados por este usuario
                created_events = [event.serialize() for event in user.created_events]

                # Agregar la lista de eventos creados al diccionario de información del usuario
                user_info['created_events'] = created_events

                # Obtener los eventos a los que está inscrito este usuario
                signedup_event = [event.serialize() for event in user.signedup_event]

                # Agregar la lista de eventos inscritos al diccionario de información del usuario
                user_info['signedup_event'] = signedup_event

                # Agregar el diccionario de información del usuario a la lista de usuarios con eventos
                users_with_events.append(user_info)
              
            return jsonify(users_with_events), 200
        else:
            return jsonify({"message": "No users found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
 
# Endpoint para obtener información de un usuario específico
@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            # Serializar la información básica del usuario
            user_info = user.serialize()
            
            return jsonify(user_info), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para actualizar información de un usuario específico
@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
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
                # Validar y configurar la nueva contraseña
                password = data["password"]
                if len(password) < 8:
                    return jsonify({"message": "Password must be at least 8 characters long."}), 400
                if not re.search(r"[A-Z]", password):
                    return jsonify({"message": "Password must contain at least one uppercase letter."}), 400
                if not re.search(r"\d", password):
                    return jsonify({"message": "Password must contain at least one digit."}), 400
                if not re.search(r"[!@#$%^&*]", password):
                    return jsonify({"message": "Password must contain at least one special character."}), 400
                user.set_password_hash(password)  # Configurar la nueva contraseña

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

# Endpoint para el formulario de solicitud de restablecimiento de contraseña
@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()

        # Verifica si se proporcionó una dirección de correo electrónico
        if "email" not in data:
            return jsonify({"message": "Email is required"}), 400
        
        # Verifica si el correo electrónico pertenece a un usuario registrado
        user = User.query.filter_by(email=data["email"]).first()
        if not user:
            return jsonify({"message": "Email not found"}), 404

        # Genera un token único para la solicitud de restablecimiento de contraseña
        reset_token = secrets.token_hex(16)

        # Guarda el token en la base de datos junto con el usuario y la fecha de expiración (puedes agregar un campo en la tabla de usuarios para esto)
        user.reset_password_token = reset_token
        user.reset_password_expires = datetime.now(timezone.utc) + timedelta(hours=1)  # Corrección aquí
        user.save()

         # Envía el correo electrónico de restablecimiento de contraseña
        send_password_reset_email(user.email, user.username, reset_token)

        return jsonify({"message": "Password reset instructions sent to your email"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Internal Server Error"}), 500

    
# Endpoint para restablecer la contraseña utilizando el token enviado por correo electrónico
@api.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()

        # Verifica si se proporcionó un token y una nueva contraseña
        if "token" not in data or "new_password" not in data:
            return jsonify({"message": "Token and new password are required"}), 400

        # Encuentra al usuario asociado con el token proporcionado
        user = User.query.filter_by(reset_password_token=data["token"]).first()
        if not user:
            return jsonify({"message": "Invalid or expired token"}), 400

        # Verifica si el token ha expirado
        current_time_utc = datetime.now(timezone.utc)
        reset_password_expires_utc = user.reset_password_expires.astimezone(timezone.utc)
        if reset_password_expires_utc < current_time_utc:
            return jsonify({"message": "Token has expired"}), 400

        # Actualiza la contraseña del usuario
        user.set_password_hash(data["new_password"])
        user.reset_password_token = None
        user.reset_password_expires = None
        user.save()

        return jsonify({"message": "Password reset successfully"}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Internal Server Error"}), 500


# Endpoint para eliminar un usuario específico
@api.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)  # Eliminar el objeto de la sesión
            db.session.commit()  # Confirmar la transacción
            print("User deleted successfully")
            return jsonify({"message": "User deleted"}), 200
        else:
            print("User not found")
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        print("Error occurred while deleting user:", e)
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para crear un nuevo evento
@api.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    try:
        data = request.get_json()
        print("Received data:", data)  # Print the received data for debugging
        if not data:
            return jsonify({"message": "No data provided"}), 400

        # Verificar si se proporcionan los campos obligatorios
        required_fields = ["name", "date", "place", "type"]
        if not all(field in data for field in required_fields):
            return jsonify({"message": "Missing required fields"}), 400

        # Crear un nuevo evento con los datos proporcionados
        event = Event(
            name=data["name"],
            type=data["type"],
            date=data["date"],
            place=data["place"],
            duration=data.get("duration", 0),
            description=data.get("description", ""),
            language=data.get("language"),
            gender=data.get("gender"),
            price_type=data.get("price_type"),
            price=data.get("price"),
            min_age=data.get("min_age"),
            max_age=data.get("max_age"),
            min_people=data.get("min_people"),
            max_people=data.get("max_people"),
            lgtbi=data.get("lgtbi", False),
            pet_friendly=data.get("pet_friendly", False),
            kid_friendly=data.get("kid_friendly", False),
            user_id=data.get("user_id", 0)
        )

        # Guardar el evento en la base de datos
        event.save()
        print("Event saved successfully:", event)  # Print the saved event for debugging

        # Devolver los datos del evento creado con el código de estado 201 (Created)
        return jsonify(event.serialize()), 201

    except Exception as e:
        # En caso de error, devolver un mensaje de error interno del servidor
        print("An error occurred:", e)  # Print the error for debugging
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
@jwt_required()
def update_event(event_id):
    try:
        data = request.get_json()
        event = Event.query.get(event_id)
        if event:
            # Actualizar los campos del evento si están presentes en los datos recibidos
            if "name" in data:
                event.name = data["name"]
            if "date" in data:
                event.date = data["date"]
            if "place" in data:
                event.place = data["place"]
            if "description" in data:
                event.description = data["description"]
            if "duration" in data:
                event.duration = data["duration"]
            if "language" in data:
                event.language = data["language"]
            if "gender" in data:
                event.gender = data["gender"]
            if "price_type" in data:
                event.price_type = data["price_type"]
            if "price" in data:
                event.price = data["price"]
            if "min_age" in data:
                event.min_age = data["min_age"]
            if "max_age" in data:
                event.max_age = data["max_age"]
            if "min_people" in data:
                event.min_people = data["min_people"]
            if "max_people" in data:
                event.max_people = data["max_people"]
            if "lgtbi" in data:
                event.lgtbi = data["lgtbi"]
            if "pet_friendly" in data:
                event.pet_friendly = data["pet_friendly"]
            if "kid_friendly" in data:
                event.kid_friendly = data["kid_friendly"]

            # Guardar los cambios en la base de datos
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
@jwt_required()
def delete_event(event_id):
    try:
        event = Event.query.get(event_id)
        if event:
            db.session.delete(event)
            db.session.commit()

            return jsonify({"message": "Event deleted"}), 200
        else:
            return jsonify({"message": "Event not found"}), 404

    except Exception as e:
        print("An error occurred while deleting the event:", e)
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para que un usuario se inscriba en un evento
@api.route('/events/<int:event_id>/signup', methods=['POST'])
@jwt_required()
def signup_event(event_id):
    try:
        data = request.get_json()
        print("Received data:", data)  # Imprimir los datos recibidos
        if not data:
            return jsonify({"message": "No data provided"}), 400

        # Validar la presencia del campo "user_id"
        if "user_id" not in data:
            return jsonify({"message": "Missing user_id field"}), 400

        # Validar que "user_id" sea un entero válido
        user_id = data.get("user_id")
        if not isinstance(user_id, int):
            return jsonify({"message": "User ID must be an integer"}), 400

        signedup_event = Signedup_event(
            user_id=user_id,
            event_id=event_id
        )
        signedup_event.save()

        return jsonify(signedup_event.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        print("An error occurred while signing up for the event:", e)  # Imprimir el error
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para que un usuario cancele su inscripción a un evento
@api.route('/users/<int:user_id>/events/<int:event_id>/signup', methods=['DELETE'])
@jwt_required()
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
        signup = Signedup_event.query.filter_by(user_id=user_id, event_id=event_id).first()
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
@jwt_required()
def get_user_events(user_id):
    try:
        # Buscar eventos inscritos por el usuario
        user_events = Event.query.join(Signedup_event, Event.id == Signedup_event.event_id).filter(Signedup_event.user_id == user_id).all()

        # Serializar los eventos encontrados
        serialized_events = [event.serialize() for event in user_events]

        return jsonify(serialized_events), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener todos los usuarios inscritos en un evento específico
@api.route('/events/<int:event_id>/users', methods=['GET'])
@jwt_required()
def get_event_users(event_id):
    try:
        # Buscar usuarios inscritos en el evento
        event_users = User.query.join(Signedup_event, User.id == Signedup_event.user_id).filter(Signedup_event.event_id == event_id).all()

        # Serializar los usuarios encontrados
        serialized_users = [user.serialize() for user in event_users]

        return jsonify(serialized_users), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
    
# Endpoint para agregar un evento a la lista de eventos favoritos de un usuario
@api.route('/users/<int:user_id>/events/<int:event_id>/favorite', methods=['POST'])
@jwt_required()
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
        if Favorite_event.query.filter_by(user_id=user_id, event_id=event_id).first():
            return jsonify({"message": "Event already in user's favorite list"}), 400

        # Agregar el evento a la lista de favoritos del usuario
        favorite_event = Favorite_event(user_id=user_id, event_id=event_id)
        favorite_event.save()

        return jsonify(favorite_event.serialize()), 201

    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para eliminar un evento de la lista de eventos favoritos de un usuario
@api.route('/users/<int:user_id>/events/<int:event_id>/favorite', methods=['DELETE'])
@jwt_required()
def remove_event_from_favorites(user_id, event_id):
    try:
        # Verificar si el evento favorito existe
        favorite_event = Favorite_event.query.filter_by(user_id=user_id, event_id=event_id).first()
        if not favorite_event:
            return jsonify({"message": "Favorite event not found"}), 404

        # Eliminar el evento de la lista de eventos favoritos del usuario
        favorite_event.delete()

        return jsonify({"message": "Favorite event removed"}), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para obtener todos los eventos favoritos de un usuario
@api.route('/users/<int:user_id>/favorite_event', methods=['GET'])
@jwt_required()
def get_user_favorite_event(user_id):
    try:
        # Obtener todos los eventos favoritos de un usuario
        user_favorite_event = Favorite_event.query.filter_by(user_id=user_id).all()
        favorite_event = [favorite_event.serialize() for favorite_event in user_favorite_event]
        return jsonify(favorite_event), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500

# Endpoint para buscar eventos por tipo
@api.route('/events/search', methods=['GET'])
def search_events():
    try:
        # Obtener parámetros de búsqueda
        query_parameters = request.args

        # Verificar si se proporciona un tipo de evento
        event_type = query_parameters.get('type')
        if not event_type:
            return jsonify({"message": "No event type provided"}), 400

        # Realizar la búsqueda de eventos por tipo
        search_results = Event.query.filter(Event.type == event_type).all()
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

        # Verificar si hay filtros proporcionados
        # retornar todos los eventos 
        if not filters:
            return jsonify({"message": "No filters provided"}), 400
        
        # Filtrar eventos según los parámetros proporcionados
        filtered_events = Event.filter_events(filters)
        
        # Construir la respuesta JSON
        response = {
            "total_events": len(filtered_events),
            "events": [event.serialize() for event in filtered_events]
        }
        return jsonify(response), 200

    except KeyError as ke:
        return jsonify({"message": f"Missing or invalid filter: {ke}"}), 400
    except ValueError as ve:
        return jsonify({"message": str(ve)}), 400
    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
    
# Endpoint para obtener eventos populares o recomendados
@api.route('/events/recommended', methods=['GET'])
def get_recommended_events():
    try:
        # Obtenemos los eventos más populares en función del número de inscripciones
        recommended_events = db.session.query(Event, func.count(Signedup_event.id).label('total_signups')).\
            outerjoin(Signedup_event).group_by(Event.id).\
            order_by(func.count(Signedup_event.id).desc()).limit(10).all()

        # Convertimos los resultados en una lista de diccionarios serializados
        recommended_events_serialized = [{"event": event.serialize(), "total_signups": total} for event, total in recommended_events]

        return jsonify(recommended_events_serialized), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error"}), 500
