import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const CreateEditEvent = () => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // component logic
  // State to manage form inputs
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  // other form fields

  // UseEffect to fetch events when component mounts
  useEffect(() => {
    actions.fetchEventRecommended();
  }, []);

  // Function to handle event creation
  const handleCreateEvent = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      // ... other form fields
    };

    // Call the action to create a new event
    actions.createEvent(newEvent);
  };

  // JSX component: - ATLAS
  return (
    <div>
      <h2>Create or Edit Event</h2>
      <form>
        {/* Event Name input */}
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        {/* Event Date input */}
        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        {/* ... other form fields */}

        {/* Submit button */}
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>

        {/* Display fetched events */}
        <div>
          <h3>Fetched Events:</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.name} - {event.date}</li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};


export default CreateEditEvent;
