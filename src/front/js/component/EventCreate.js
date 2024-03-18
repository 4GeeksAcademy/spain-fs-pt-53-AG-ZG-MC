import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const CreateEvent = () => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage form inputs. To omplete with other form fields.
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // UseEffect to fetch events when component mounts
  useEffect(() => {
    actions.fetchEventRecommended();
  }, [actions]);

  // Function to handle event creation
  const handleCreateEvent = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      duration: eventDuration,
      // ... other form fields
    };

    // Placeholder API endpoint to store the created event
    // const apiUrl = "https://api-url.com/create-event";

    // POST request to the backend API to store created event
    // through the appContext.js
    // POST request to the API to store the created event:
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': getCookie('access_token')
      },

      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the event is successfully stored, update the UI or take other actions as needed
        console.log("Event created successfully:", data);

        // Update local state with the created event
        setEventName("");
        setEventDate("");
        // Optionally, update the store with the new event
        // actions.createEvent(data);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
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


export default CreateEvent;
