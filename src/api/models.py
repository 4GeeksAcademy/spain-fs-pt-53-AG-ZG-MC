from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from datetime import datetime, timedelta
import bcrypt
import secrets
import re

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    followed_users = db.Column(db.Integer, nullable=False)
    users_following_me = db.Column(db.Integer, nullable=False)
    
    created_events = db.relationship('Event', backref='user', lazy=True)
    signedup_events = db.relationship('Signedup_events', backref='user', lazy=True)
    favorite_events = db.relationship('Favorite_events', backref='user', lazy=True)

    # Campos de auditoría
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def validate_email(self, email):
        regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return re.match(regex, email) is not None

    def set_email(self, email):
        if not self.validate_email(email):
            raise ValueError("Invalid email address")
        self.email = email
    
    def set_password(self, password):
        # Verificar la longitud mínima de la contraseña
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")

        # Verificar si la contraseña contiene al menos una letra mayúscula
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter.")

        # Verificar si la contraseña contiene al menos un número
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one digit.")

        # Verificar si la contraseña contiene al menos un carácter especial
        if not re.search(r"[!@#$%^&*]", password):
            raise ValueError("Password must contain at least one special character.")

        # Genera una sal aleatoria única
        salt = secrets.token_hex(16)  # Genera una cadena hexadecimal de 16 bytes como sal

        # Combina la contraseña con la sal
        salted_password = salt + password

        # Aplica el hash a la contraseña con la sal
        hashed_password = bcrypt.hashpw(salted_password.encode('utf-8'), bcrypt.gensalt())

        # Almacena la sal y el hash en la base de datos
        self.salt = salt
        self.password = hashed_password
    
    def check_password(self, password):
        # Aplica el mismo hash a la contraseña proporcionada junto con la sal almacenada
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), self.salt)
        # Compara el hash generado con el hash almacenado en la base de datos
        return hashed_password == self.password
    
    def save(self):
        # Actualizar la fecha de actualización al guardar
        self.updated_at = datetime.utcnow()
        # Guardar el usuario en la base de datos
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "followed_users": self.followed_users,
            "users_following_me": self.users_following_me,
        }
    
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_owner = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(240), nullable=False, index=True)
    type = db.Column(db.Enum('nature', 'party', 'culture', 'relax', 'family', 'sport', name='event_type_enum'), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False, index=True)
    place = db.Column(db.String(240), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(750), nullable=False)
    language = db.Column(db.Enum('spanish', 'catalan', 'english', 'german', 'french'))
    gender = db.Column(db.Enum('female_only', 'queer_only', 'all_genders', 'no_preferences', name='gender_selection_enum'), nullable=False)
    price_type = db.Column(db.Enum('free', 'paid'), nullable=False)
    price = db.Column(db.Integer)
    min_age = db.Column(db.Integer)
    max_age = db.Column(db.Integer)
    min_people = db.Column(db.Integer)
    max_people = db.Column(db.Integer)
    lgtbi = db.Column(db.Boolean(), nullable=False)
    pet_friendly = db.Column(db.Boolean(), nullable=False)
    kid_friendly = db.Column(db.Boolean(), nullable=False)

    signedup_events = db.relationship('Signedup_events', backref='event', lazy=True)
    favorite_events = db.relationship('Favorite_events', backref='event', lazy=True)

    # Campos de auditoría
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @staticmethod
    def get_events(page, per_page):
        return Event.query.paginate(page=page, per_page=per_page)

    def validate_date(self, date_str):
        try:
            # Intenta analizar la cadena de fecha en un objeto datetime
            parsed_date = datetime.strptime(date_str, '%d-%m-%Y')
            
            # Verificar si la fecha está en el pasado
            if parsed_date < datetime.now():
                return False  # La fecha está en el pasado
            else:
                return True   # La fecha es válida (no está en el pasado)
        except ValueError:
            return False  # La cadena de fecha no es válida o el formato es incorrecto

    def set_date(self, date_str):
        if not self.validate_date(date_str):
            raise ValueError("Invalid date format. Date should be in the format 'DD-MM-YYYY'")
        self.date = datetime.strptime(date_str, '%d-%m-%Y')

    @staticmethod
    def filter_events(filters):
        query = Event.query

        # Aplicar filtros dinámicos
        # Filtrar por tipo de evento
        if 'event_type' in filters:
            event_types = filters['event_type']
            query = query.filter(Event.type.in_(event_types))

        # Filtro de fecha
        if 'date_filter' in filters:
            date_filter = filters['date_filter']
            if date_filter == 'custom':
                # Filtrar por fechas personalizadas
                start_date = filters['start_date']
                end_date = filters['end_date']
                query = query.filter(Event.date >= start_date, Event.date <= end_date)
            else:
                # Filtrar por opciones de fecha predefinidas
                if date_filter == 'today':
                    query = query.filter(Event.date == datetime.today().date())
                elif date_filter == 'tomorrow':
                    query = query.filter(Event.date == (datetime.today() + timedelta(days=1)).date())
                elif date_filter == 'this_week':
                    end_of_week = datetime.today() + timedelta(days=(6 - datetime.today().weekday()))
                    query = query.filter(Event.date >= datetime.today().date(), Event.date <= end_of_week)
                elif date_filter == 'this_weekend':
                    end_of_week = datetime.today() + timedelta(days=(6 - datetime.today().weekday()))
                    next_weekend = end_of_week + timedelta(days=(5 - end_of_week.weekday()))
                    query = query.filter(Event.date >= end_of_week.date(), Event.date <= next_weekend.date())
                elif date_filter == 'next_week':
                    start_of_next_week = datetime.today() + timedelta(days=(7 - datetime.today().weekday()))
                    end_of_next_week = start_of_next_week + timedelta(days=6)
                    query = query.filter(Event.date >= start_of_next_week.date(), Event.date <= end_of_next_week.date())

            # Filtro de duración
            if 'duration_filter' in filters:
                duration_filters = filters['duration_filter']
                duration_criteria = []

                for duration_filter in duration_filters:
                    if duration_filter == 'short':
                        duration_criteria.append(Event.duration <= 60)
                    elif duration_filter == 'medium':
                        duration_criteria.append((Event.duration > 60) & (Event.duration <= 120))
                    elif duration_filter == 'long':
                        duration_criteria.append(Event.duration > 120)

                if duration_criteria:
                    query = query.filter(or_(*duration_criteria))

        # Filtrar por edad mínima y máxima
        if 'age_range_filter' in filters:
            min_age = filters['age_range_filter'].get('min_age')
            max_age = filters['age_range_filter'].get('max_age')
            if min_age is not None:
                query = query.filter(Event.min_age >= min_age)
            if max_age is not None:
                query = query.filter(Event.max_age <= max_age)

        # Filtrar por cantidad mínima y máxima de personas
        if 'people_range_filter' in filters:
            min_people = filters['people_range_filter'].get('min_people')
            max_people = filters['people_range_filter'].get('max_people')
            if min_people is not None:
                query = query.filter(Event.min_people >= min_people)
            if max_people is not None:
                query = query.filter(Event.max_people <= max_people)

        # Filtrar por género
        if 'gender_filter' in filters:
            gender_filters = filters['gender_filter']
            gender_criteria = []

            for gender_filter in gender_filters:
                if gender_filter == 'female_only':
                    gender_criteria.append(Event.gender == 'female_only')
                elif gender_filter == 'queer_only':
                    gender_criteria.append(Event.gender == 'queer_only')
                elif gender_filter == 'all_genders':
                    gender_criteria.append(Event.gender == 'all_genders')
                elif gender_filter == 'no_preferences':
                    gender_criteria.append(Event.gender == 'no_preferences')

            if gender_criteria:
                query = query.filter(or_(*gender_criteria))

        # Filtro de idioma
        if 'language_filter' in filters:
            language_filters = filters['language_filter']
            language_criteria = []

            for language_filter in language_filters:
                if language_filter == 'spanish':
                    language_criteria.append(Event.language == 'spanish')
                elif language_filter == 'catalan':
                    language_criteria.append(Event.language == 'catalan')
                elif language_filter == 'english':
                    language_criteria.append(Event.language == 'english')
                elif language_filter == 'german':
                    language_criteria.append(Event.language == 'german')
                elif language_filter == 'french':
                    language_criteria.append(Event.language == 'french')

            if language_criteria:
                query = query.filter(or_(*language_criteria))

        # Filtro de precio
        if 'price_type_filter' in filters:
            price_type_filters = filters['price_type_filter']
            price_type_criteria = []

            for price_type_filter in price_type_filters:
                if price_type_filter == 'free':
                    price_type_criteria.append(Event.price_type == 'free')
                elif price_type_filter == 'paid':
                    price_type_criteria.append(Event.price_type == 'paid')

            if price_type_criteria:
                query = query.filter(or_(*price_type_criteria))

        return query.all()

    __table_args__ = (
    db.CheckConstraint('min_age >= 0', name='event_min_age_positive'),
    db.CheckConstraint('max_age >= min_age', name='event_max_age_greater_than_min_age'),
    db.CheckConstraint('min_people >= 0', name='event_min_people_positive'),
    db.CheckConstraint('max_people >= min_people', name='event_max_people_greater_than_min_people')
    )

    def validate_age_range(self):
        # Verifica que min_age sea menor o igual que max_age
        if self.min_age is not None and self.max_age is not None:
            if self.min_age > self.max_age:
                raise ValueError("min_age must be less than or equal to max_age")

    def validate_people_range(self):
        # Verifica que min_people sea menor o igual que max_people
        if self.min_people is not None and self.max_people is not None:
            if self.min_people > self.max_people:
                raise ValueError("min_people must be less than or equal to max_people")

    def save(self):
        # Actualizar la fecha de actualización al guardar
        self.updated_at = datetime.utcnow()
        # Validar rangos de edad y personas
        self.validate_age_range()
        self.validate_people_range()
        # Guardar el evento en la base de datos
        db.session.add(self)
        db.session.commit()
        
    def __repr__(self):
        return f'<Event {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_owner": self.user_owner,
            "name": self.name,
            "type": self.type,
            "date": self.date,
            "place": self.place,
            "duration": self.duration,
            "description": self.description,
            "language": self.language,
            "gender": self.gender,
            "price_type": self.price_type,
            "price": self.price,
            "min_age": self.min_age,
            "max_age": self.max_age,
            "min_people": self.min_people,
            "max_people": self.max_people,
            "lgtbi": self.lgtbi,
            "pet_friendly": self.pet_friendly,
            "kid_friendly": self.kid_friendly,
        }

class Signedup_events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    
    def __repr__(self):
        return f'<Signedup_events {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
        }

class Favorite_events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def __repr__(self):
        return f'<Signedup_events {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
        }