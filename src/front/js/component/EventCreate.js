import React, { useContext, useState } from "react";
import { Context } from '../store/appContext';

// REVISAR PORQUE RENDERIZA CADA INPUT
// REVISAR EL PROBLEMA DE MAX Y MIN PEOPLE

const CreateEvent = ({ event }) => {
  console.log("Event Create:", event);

  const { actions } = useContext(Context);

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    duration: "",
    type: "",
    place: "",
    description: "",
    language: "",
    gender: "",
    price_type: "",
    price: "",
    min_age: "",
    max_age: "",
    min_people: "",
    max_people: "",
    lgtbi: false,
    pet_friendly: false,
    kid_friendly: false,
    user_id: ""
  });

  const handleCreateEvent = async () => {
    try {
      await actions.createEvent(eventData);
      console.log('Evento creado exitosamente');
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEventData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  // JSX component: - ATLAS
  return (
    <div>
      <h2>Create Event</h2>
      <form>
        {/* Event Name input */}
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />

        {/* Event Date input */}
        <label htmlFor="eventDate">Event Date:</label>
        <input
          type="date"
          id="eventDate"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />

        {/* Event Duration input */}
        <label htmlFor="eventDuration">Event Duration:</label>
        <input
          type="text"
          id="eventDuration"
          name="duration"
          value={eventData.duration}
          onChange={handleInputChange}
        />

        {/* Event Type input */}
        <label htmlFor="eventType">Event Type:</label>
        <input
          type="text"
          id="eventType"
          name="type"
          value={eventData.type}
          onChange={handleInputChange}
        />

        {/* Event Place input */}
        <label htmlFor="eventPlace">Event Place:</label>
        <input
          type="text"
          id="eventPlace"
          name="place"
          value={eventData.place}
          onChange={handleInputChange}
        />

        {/* Event Description input */}
        <label htmlFor="eventDescription">Event Description:</label>
        <input
          type="text"
          id="eventDescription"
          name="description"          
          value={eventData.description}
          onChange={handleInputChange}
        />

        {/* Event Language input */}
        <label htmlFor="eventLanguage">Event Language:</label>
        <input
          type="text"
          id="eventLanguage"
          name="language"
          value={eventData.language}
          onChange={handleInputChange}
        />

        {/* Event Gender input */}
        <label htmlFor="eventGender">Event Gender:</label>
        <input
          type="text"
          id="eventGender"
          name="gender"
          value={eventData.gender}
          onChange={handleInputChange}
        />

        {/* Event Price Type input */}
        <label htmlFor="eventPriceType">Event Price Type:</label>
        <input
          type="text"
          id="eventPriceType"
          name="price_type"
          value={eventData.price_type}
          onChange={handleInputChange}
        />

        {/* Event Price input */}
        <label htmlFor="eventPrice">Event Price:</label>
        <input
          type="number"
          id="eventPrice"
          name="price"
          value={eventData.price}
          onChange={handleInputChange}
        />

        {/* Event Min Age input */}
        <label htmlFor="eventMinAge">Event Min Age:</label>
        <input
          type="number"
          id="eventMinAge"
          name="min_age"
          value={eventData.min_age}
          onChange={handleInputChange}
        />

        {/* Event Max Age input */}
        <label htmlFor="eventMaxAge">Event Max Age:</label>
        <input
          type="number"
          id="eventMaxAge"
          name="max_age"
          value={eventData.max_age}
          onChange={handleInputChange}
        />

        {/* Event Min People input */}
        <label htmlFor="eventMinPeople">Event Min People:</label>
        <input
          type="number"
          id="eventMinPeople"
          name="min_people"
          value={eventData.min_people}
          onChange={handleInputChange}
        />

        {/* Event Max People input */}
        <label htmlFor="eventMaxPeople">Event Max People:</label>
        <input
          type="number"
          id="eventMaxPeople"
          name="max_people"
          value={eventData.max_people}
          onChange={handleInputChange}
        />

        {/* Event Lgtbi input */}
        <label htmlFor="eventLgtbi">Event Lgtbi:</label>
        <input
          type="checkbox"
          id="eventLgtbi"
          name="lgtbi"
          checked={eventData.lgtbi}
          onChange={handleInputChange}
        />

        {/* Event Pet input */}
        <label htmlFor="eventPet">Event Pet:</label>
        <input
          type="checkbox"
          id="eventPet"
          name="pet_friendly"
          checked={eventData.pet_friendly}
          onChange={handleInputChange}
        />

        {/* Event Kids input */}
        <label htmlFor="eventKids">Event Kids:</label>
        <input
          type="checkbox"
          id="eventKids"
          name="kid_friendly"
          checked={eventData.kid_friendly}
          onChange={handleInputChange}
        />

        {/* Event UserId input */}
        <label htmlFor="eventUserId">Event UserId:</label>
        <input
          type="text"
          id="eventUserId"
          name="user_id"
          value={eventData.user_id}
          onChange={handleInputChange}
        />        
        
        {/* Submit button */}
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
