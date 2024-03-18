import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { getCookie } from "../store/flux";


const EditEvent = () => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage form inputs. To complete with other form fields.
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // UseEffect to fetch events when component mounts
  useEffect(() => {
    actions.fetchEventRecommended();
  }, [actions]);

  // Function to handle event update
  const handleUpdateEvent = () => {
    const updatedEvent = {
      name: eventName,
      date: eventDate,
      // ... other form fields
    };

    // Placeholder API endpoint to update the event
    // const apiUrl = `https://api-url.com/events/${eventId}`;

    // PUT request to the backend API to update the event
    // through the appContext.js
    // PUT request to the API to update the event:
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': getCookie('access_token')
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the event is successfully updated, update the UI or take other actions as needed
        console.log("Event updated successfully:", data);

        // Reset form fields
        setEventName("");
        setEventDate("");
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  // JSX - ATLAS
  return (
    <div>
      <h2>Edit Event</h2>
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
        <button type="button" onClick={handleUpdateEvent}>
          Update Event
        </button>

        {/* Display fetched events */}
        <div>
          <h3>Fetched Events:</h3>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                {event.name} - {event.date}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
