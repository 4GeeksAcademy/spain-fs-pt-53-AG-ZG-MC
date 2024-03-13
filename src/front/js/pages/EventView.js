// EventView.js

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../appContext';
import EventDetails from '../components/EventDetails';

const EventView = () => {
  const { id } = useParams(); // Get the event ID from URL params
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch event details when component mounts
    actions.fetchEventDetails(id);
  }, [id, actions]);

  return (
    <div>
      <h1>Event Details</h1>
      {store.eventDetails ? (
        <EventDetails event={store.eventDetails} />
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventView;
