import React from 'react';
import EventCard from './EventCard';


const EventRecommended = ({ events }) => {

  if (!events || !Array.isArray(events)) {
    return <div>No events available</div>;
  }

  const limitedEvents = events.slice(0, 5);

  return (
    <div className="event-recommended">
      <h2>Recommended Events</h2>
      <div className="event-card-container">
        {limitedEvents.map(event => (
          <EventCard key={event.event.id} event={event.event} />
        ))}
      </div>
    </div>
  );
};

export default EventRecommended;
