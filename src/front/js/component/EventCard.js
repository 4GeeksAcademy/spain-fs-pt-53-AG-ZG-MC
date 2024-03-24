import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    if (!event) {
        return null;
    }

    const { id, userId, username, name, date, place } = event;


    return (
        <div className="event-card">
            <h1>Hola Card</h1>
            <h3>{name}</h3>
            <p>Date: {new Date(date).toDateString()}</p>
            <p>Place: {place}</p>
            <Link to={`/events/${id}`}>
                <button>View Details</button>
            </Link>
            
        </div>
    );
};

export default EventCard;

