// EventsAll.js

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import EventCard from '../component/EventCard';

const EventsListAll = () => {
  const { store, actions } = useContext(Context);
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   setEvents(store.events);
  //   console.log("Ejecutando useEffect 1:", store.events)
  // }, [store.events]);

  // console.log("Events outside useEffect1:", events);

  useEffect(() => {
    console.log("Ejecutando useEffect 2 - Events:", events);
    actions.fetchAllEvents()
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  console.log("Events outside useEffect2:", events);

  return (
    <div>
      <h1>All Events</h1>
      <div className="event-list">
        {events.length > 0 && events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsListAll;
