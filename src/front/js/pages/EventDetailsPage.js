// EventView.js

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventDetails from '../component/EventDetails';

const EventDetailsPage = () => {
  const { id } = useParams(); // Get the event ID from URL params
  const { store, actions } = useContext(Context);
  const { events } = store

  console.log("Events Details Page:", events);


  return (
    <div>
      <h1>Event Details</h1>
      {events.events && events.events.length > 0 && events.events.map(event => (
          <EventDetails key={event.id} event={event} />
        ))}
      {/* {events.events ? (
        <EventDetails event={store.eventDetails} />
      ) : (
        <p>Loading event details...</p>
      )} */}
    </div>
  );
};

export default EventDetailsPage;
