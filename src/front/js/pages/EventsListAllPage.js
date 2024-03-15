// EventsAll.js

import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import EventCard from '../component/EventCard';

const EventsListAll = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchAllEvents(); // Fetch all events when the component mounts
  }, []);

  return (
    <div>
      <h1>All Events</h1>
      <div className="event-list">
        {store.events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsListAll;
