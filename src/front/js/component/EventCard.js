//vista no detallada del evento
//diseño dentro card horizontal
import React from 'react';

const EventCard = ({ event }) => {
    const { userID, username } = event;
    return (
        <div className="event-card">
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Place: {event.place}</p>
            <Link to={`/profile/${userID}`}>View Profile ({username})</Link>
        </div>
    );
};

export default EventCard;
