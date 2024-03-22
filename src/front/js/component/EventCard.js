//vista no detallada del evento
//diseño dentro card horizontal
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    if (!event) {
        return null; // Si no hay evento, retorna null para evitar errores
    }

    const { id, userId, username, name, date, place } = event; // Desestructura el evento para obtener sus propiedades

    const eventDateFormatted = new Date(date).toISOString().split('T')[0];


    return (
        <div className="event-card">
            <h1>Hola Card</h1>
            <h3>{name}</h3>
            <p>Date: {new Date(date).toDateString()}</p>
            <p>Place: {place}</p>
            
            {/* <Link to={`/profile/${username}`}>View Profile ({username})</Link> */}
        </div>
    );
};

export default EventCard;

