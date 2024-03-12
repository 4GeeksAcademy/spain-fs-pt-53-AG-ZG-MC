//vista no detallada del evento
//diseño dentro card horizontal
import React from 'react';

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Place: {event.place}</p>
        </div>
    );
};

export default EventCard;
