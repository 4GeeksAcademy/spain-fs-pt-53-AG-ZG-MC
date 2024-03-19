// EventView.js

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import EventDetails from '../component/EventDetails';

const EventDetailsPage = () => {
  const { id } = useParams(); // Get the event ID from URL params
  const { store } = useContext(Context);
  const { events } = store;

  console.log("Events Details Page:", events);

  const eventList = events.events || [];

  const eventToShow = eventList.find(event => event.id === parseInt(id));

  return (
    <div>
      <h1>Event Details</h1>
      {eventToShow &&
          <EventDetails key={eventToShow.id} event={eventToShow} />
      }
    </div>
  );
};

export default EventDetailsPage;
