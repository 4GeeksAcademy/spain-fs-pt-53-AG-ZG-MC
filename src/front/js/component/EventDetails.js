import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import EventActions from "./EventActions";

//ver ubicacion del evento en mapa con api
//ver el clima API - componente separado
//VER Nº de asistentes

const EventDetails = ({ eventId }) => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage selected event details
  const [eventDetails, setEventDetails] = useState(null);
  const [attendeesCount, setAttendeesCount] = useState(0);

  // UseEffect to update event details when component mounts or eventId changes
  useEffect(() => {
    // Find the event with the specified eventId
    const selectedEvent = events.find((event) => event.id === eventId);

    // Update the eventDetails state
    setEventDetails(selectedEvent);

    // Fetch weather forecast (we need function to fetch it from an external API)
    fetchWeatherForecast(selectedEvent.location);

    // Fetch number of attendees
    fetchAttendeesCount(selectedEvent.id);

  }, [events, eventId]);


  // Function to fetch number of attendees
  const fetchAttendeesCount = async (eventId) => {
    try {
      // Call the function to fetch number of attendees from the backend
      const count = await actions.getAttendeesCount(eventId);
      setAttendeesCount(count);
    } catch (error) {
      console.error("Error fetching attendees count", error);
    }
  };

  // JSX component - Atlas
  return (
    <div>
      <h2>Event Details</h2>
      {eventDetails && (
        <div>
          <h3>{eventDetails.name}</h3>
          <p>Date: {eventDetails.date}</p>
          <p>Location: {eventDetails.location}</p>
          {/* assuming weather forecast needs location to fetch weather, 
          from separate component */}
          <WeatherForecast location={eventDetails.location} />
          <p>Attendees Count: {attendeesCount}</p>
          <EventActions eventId={eventId} />
        </div>
      )}
    </div>
  );
};

export default EventDetails;
