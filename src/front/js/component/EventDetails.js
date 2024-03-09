import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import EventActions from "./EventActions";

const EventDetails = ({ eventId }) => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage selected event details
  const [eventDetails, setEventDetails] = useState(null);

  // UseEffect to update event details when component mounts or eventId changes
  useEffect(() => {
    // Find the event with the specified eventId
    const selectedEvent = events.find((event) => event.id === eventId);

    // Update the eventDetails state
    setEventDetails(selectedEvent);
  }, [events, eventId]);

  // JSX component:
  return (
    <div>
      <h2>Event Details</h2>
      {eventDetails ? (
        <div>
          <p><strong>Name:</strong> {eventDetails.name}</p>
          <p><strong>Description:</strong> {eventDetails.description}</p>
          <p><strong>Date:</strong> {eventDetails.date}</p>
          <p><strong>Created By:</strong> {eventDetails.createdBy}</p>
          {/* Add more details as needed */}

          {/* Placeholder for the map */}
          <div>
            <p>Map Placeholder (Replace with the actual map component)</p>
          </div>

          {/* Render EventActions component */}
          <EventActions eventId={eventId} />
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetails;
