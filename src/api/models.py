from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from datetime import datetime, timedelta
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import re

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    followed_users = db.Column(db.Integer, nullable=False)
    users_following_me = db.Column(db.Integer, nullable=False)

    # Campos para el restablecimiento de contraseña
    reset_password_token = db.Column(db.String(100), nullable=True)
    reset_password_expires = db.Column(db.DateTime, nullable=True)

    created_events = db.relationship('Event', back_populates='user', lazy=True)
    signedup_event = db.relationship('Signedup_event', back_populates='user', lazy=True)
    favorite_event = db.relationship('Favorite_event', back_populates='user', lazy=True)

    # Campos de auditoría
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    def validate_email(self, email):
        regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return re.match(regex, email) is not None

    def set_email_address(self, email):
        if not self.validate_email(email):
            raise ValueError("Invalid email address")
        self.email = email
    
    def set_password_hash(self, password):
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

        try:
            # Aplicar el hash a la contraseña con la sal
            hashed_password = generate_password_hash(password).decode('utf-8')
            self.password = hashed_password
            print("Hashed password:", hashed_password)
        except Exception as e:
            print("Error setting password hash:", e)

    def check_password(self, password):
        try:
            # Verificar la contraseña concatenada con la contraseña almacenada
            is_valid_password = check_password_hash(self.password, password)
            print("Password is valid:", is_valid_password)
            return is_valid_password
        except Exception as e:
            print("Error checking password:", e)
            return False

    def save(self):
        # Actualizar la fecha de actualización al guardar
        self.updated_at = datetime.now(timezone.utc)
        # Guardar el usuario en la base de datos
        db.session.add(self)
        db.session.commit()
    
    def __repr__(self):
        return f'<User id={self.id}, username={self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "followed_users": self.followed_users,
            "users_following_me": self.users_following_me,
            "created_events": [event.serialize() for event in self.created_events],
            "signedup_events": [event.serialize() for event in self.signedup_event],
            "favorite_event": [favorite_event.event.serialize() for favorite_event in self.favorite_event]
        }
    
class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(240), nullable=False, index=True)
    type = db.Column(db.Enum('nature', 'party', 'culture', 'relax', 'family', 'sport', name="type_enum"), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False, index=True)
    place = db.Column(db.String(240), nullable=False, index=True)
    duration = db.Column(db.Integer, nullable=False, index=True)
    description = db.Column(db.String(750), nullable=False)
    language = db.Column(db.Enum('spanish', 'catalan', 'english', 'german', 'french', name="language_enum"), index=True)
    gender = db.Column(db.Enum('female_only', 'queer_only', 'all_genders', name="gender_enum"), nullable=False, index=True)
    price_type = db.Column(db.Enum('free', 'paid', name="pricetype_enum"), nullable=False, index=True)
    price = db.Column(db.Integer, index=True)
    min_age = db.Column(db.Integer, index=True)
    max_age = db.Column(db.Integer, index=True)
    min_people = db.Column(db.Integer, index=True)
    max_people = db.Column(db.Integer, index=True)
    lgtbi = db.Column(db.Boolean(), index=True)
    pet_friendly = db.Column(db.Boolean(), nullable=False, index=True)
    kid_friendly = db.Column(db.Boolean(), nullable=False, index=True)

    user = db.relationship('User', back_populates='created_events', lazy=True)
    signedup_event = db.relationship('Signedup_event', back_populates='event', lazy=True)
    favorite_event = db.relationship('Favorite_event', back_populates='event', lazy=True)

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

        print("Filters received:", filters)

        # Aplicar filtros dinámicos
        # Filtrar por tipo de evento
        if 'event_type' in filters:
            event_types = filters['event_type']
            print("Applying event type filter:", event_types)
            query = query.filter(Event.type.in_(event_types))

        # Filtro de fecha
        if 'date_filter' in filters:
            date_filter = filters['date_filter']
            print("Applying date filter:", date_filter)
            if date_filter == 'custom':
                # Filtrar por fechas personalizadas
                start_date = filters['start_date']
                end_date = filters['end_date']
                print("Applying custom date range filter:", start_date, "-", end_date)
                query = query.filter(Event.date >= start_date, Event.date <= end_date)
            else:
                # Filtrar por opciones de fecha predefinidas
                if date_filter == 'today':
                    print("Applying today's date filter")
                    query = query.filter(Event.date == datetime.today().date())
                elif date_filter == 'tomorrow':
                    print("Applying tomorrow's date filter")
                    query = query.filter(Event.date == (datetime.today() + timedelta(days=1)).date())
                elif date_filter == 'this_week':
                    print("Applying this week's date filter")
                    end_of_week = datetime.today() + timedelta(days=(6 - datetime.today().weekday()))
                    query = query.filter(Event.date >= datetime.today().date(), Event.date <= end_of_week)
                elif date_filter == 'this_weekend':
                    print("Applying this weekend's date filter")
                    end_of_week = datetime.today() + timedelta(days=(6 - datetime.today().weekday()))
                    next_weekend = end_of_week + timedelta(days=(5 - end_of_week.weekday()))
                    query = query.filter(Event.date >= end_of_week.date(), Event.date <= next_weekend.date())
                elif date_filter == 'next_week':
                    print("Applying next week's date filter")
                    start_of_next_week = datetime.today() + timedelta(days=(7 - datetime.today().weekday()))
                    end_of_next_week = start_of_next_week + timedelta(days=6)
                    query = query.filter(Event.date >= start_of_next_week.date(), Event.date <= end_of_next_week.date())

        # Filtro de duración
        if 'duration_filter' in filters:
            duration_filters = filters['duration_filter'].split(",")
            duration_criteria = []
            print("duration:", duration_filters)
            for duration_filter in duration_filters:
                if duration_filter == 'short':
                    duration_criteria.append(Event.duration <= 60)
                elif duration_filter == 'medium':
                    duration_criteria.append((Event.duration > 60) & (Event.duration <= 120))
                elif duration_filter == 'long':
                    duration_criteria.append(Event.duration > 120)
            print("duration criteria: ", duration_criteria)
            if duration_criteria:
                print("Applying duration filter:", duration_criteria)
                query = query.filter(or_(*duration_criteria))

        # Filtrar por edad mínima y máxima
        if 'age_range_filter_min' in filters or 'age_range_filter_max' in filters:
            min_age = filters['age_range_filter_min']
            max_age = filters['age_range_filter_max']
            if min_age is not None:
                print("Applying min age filter:", min_age)
                query = query.filter(Event.min_age >= int(min_age))
            if max_age is not None:
                print("Applying max age filter:", max_age)
                query = query.filter(Event.max_age <= int(max_age))

        # Filtrar por cantidad mínima y máxima de personas
        if 'people_range_filter_min' in filters or 'people_range_filter_max' in filters:
            min_people = filters['people_range_filter_min']
            max_people = filters['people_range_filter_max']
            if min_people is not None:
                print("Applying min people filter:", min_people)
                query = query.filter(Event.min_people >= int(min_people))
            if max_people is not None:
                print("Applying max people filter:", max_people)
                query = query.filter(Event.max_people <= int(max_people))

        # Filtrar por género
        if 'gender_filter' in filters:
            gender_filters = filters['gender_filter'].split(",")
            gender_criteria = []

            for gender_filter in gender_filters:
                if gender_filter == 'female_only':
                    gender_criteria.append(Event.gender == 'female_only')
                elif gender_filter == 'queer_only':
                    gender_criteria.append(Event.gender == 'queer_only')
                elif gender_filter == 'all_genders':
                    gender_criteria.append(Event.gender == 'all_genders')

            if gender_criteria:
                print("Applying gender filter:", gender_criteria)
                query = query.filter(or_(*gender_criteria))

        # Filtro de idioma
        if 'language_filter' in filters:
            language_filters = filters['language_filter'].split(",")
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
                print("Applying language filter:", language_criteria)
                query = query.filter(or_(*language_criteria))

        # Filtro de precio
        if 'price_type_filter' in filters:
            price_type_filters = filters['price_type_filter'].split(",")
            price_type_criteria = []

            for price_type_filter in price_type_filters:
                if price_type_filter == 'free':
                    price_type_criteria.append(Event.price_type == 'free')
                elif price_type_filter == 'paid':
                    price_type_criteria.append(Event.price_type == 'paid')

            if price_type_criteria:
                print("Applying price type filter:", price_type_criteria)
                query = query.filter(or_(*price_type_criteria))

        # Filtrar por amigable para la comunidad LGTBI
        if 'lgtbi' in filters:
            lgtbi_value = filters['lgtbi']
            print("Applying lgtbi filter:", lgtbi_value)
            if lgtbi_value.lower() == 'true':
                query = query.filter(Event.lgtbi == True)
            elif lgtbi_value.lower() == 'false':
                query = query.filter(Event.lgtbi == False)
            else:
                print("Invalid value for lgtbi filter:", lgtbi_value)

        # Filtrar por amigable para niños
        if 'kid_friendly' in filters:
            kid_friendly_value = filters['kid_friendly']
            print("Applying kid friendly filter:", kid_friendly_value)
            if kid_friendly_value.lower() == 'true':
                query = query.filter(Event.kid_friendly == True)
            elif kid_friendly_value.lower() == 'false':
                query = query.filter(Event.kid_friendly == False)
            else:
                print("Invalid value for kid friendly filter:", kid_friendly_value)

        # Filtrar por amigable para mascotas
        if 'pet_friendly' in filters:
            pet_friendly_value = filters['pet_friendly']
            print("Applying pet friendly filter:", pet_friendly_value)
            if pet_friendly_value.lower() == 'true':
                query = query.filter(Event.pet_friendly == True)
            elif pet_friendly_value.lower() == 'false':
                query = query.filter(Event.pet_friendly == False)
            else:
                print("Invalid value for pet friendly filter:", pet_friendly_value)

        filtered_events = query.all()
        print("Filtered events:", filtered_events)

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
        return f'<Event id={self.id}, name={self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
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

class Signedup_event(db.Model):
    __tablename__ = 'signedup_event'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    
    user = db.relationship('User', back_populates='signedup_event', lazy=True)
    event = db.relationship('Event', back_populates='signedup_event', lazy=True)

    def __repr__(self):
        return f'<Signedup_event id={self.id}, user_id={self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Favorite_event(db.Model):
    __tablename__ = 'favorite_event'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    user = db.relationship('User', back_populates='favorite_event', lazy=True)
    event = db.relationship('Event', back_populates='favorite_event', lazy=True)

    def __repr__(self):
        return f'<Favorite_event id={self.id}, user_id{self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "event": self.event.serialize()
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()