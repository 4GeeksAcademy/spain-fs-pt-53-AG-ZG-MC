//vista no detallada del evento
//diseño dentro card horizontal
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    console.log("Event Card:", event); // Verifica el contenido del evento

    if (!event) {
        return null; // Si no hay evento, retorna null para evitar errores
    }

    const { id, userId, username, name, date, place } = event; // Desestructura el evento para obtener sus propiedades

    return (
        <div className="event-card">
            <h1>Hola Card</h1>
            <h3>{name}</h3>
            <p>Date: {date}</p>
            <p>Place: {place}</p>
            <Link to={`/profile/${userId}`}>View Profile ({username})</Link>
        </div>
    );
};

export default EventCard;

