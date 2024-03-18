// EventsAll.js

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import EventCard from '../component/EventCard';

const EventsListAll = () => {
  const { store, actions } = useContext(Context);
  const { events } = store

  console.log("Events:", events);

  return (
    <div>
      <h1>All Events</h1>
      <div className="event-list">
        {events.events && events.events.length > 0 && events.events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsListAll;
