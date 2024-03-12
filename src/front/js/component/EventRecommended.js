import React from 'react';
import EventCard from './EventCard';

// EVENTOS DESTACADOS EN HOME
// diseño dentro card vertical

const EventRecommended = ({ events }) => {
  return (
    <div className="event-recommended">
      <h2>Recommended Events</h2>
      <div className="event-card-container">
        {events.slice(0, 5).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventRecommended;
