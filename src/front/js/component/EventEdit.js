import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

// REVISAR PORQUE RENDERIZA CADA INPUT
// añadido al form la parte que estaba en el boton, da menos problemas

const EditEvent = ({ event }) => {
  console.log("Event edit:", event);

  const { actions } = useContext(Context);

  event.date = new Date(event.date);

  const [eventData, setEventData] = useState(event);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEventData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };
  
  const formatDateValue = (dateValue) => {
    if (dateValue instanceof Date) {
      return dateValue.toISOString().split('T')[0];
    } else {
      return dateValue; // O cualquier otro valor predeterminado que prefieras
    }
  };

  // Function to handle event update
  const handleUpdateEvent = async () => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    try {
      console.log('Updating event:', eventData); // Agregar este console.log()
      await actions.editEvent(event.id, eventData);
      console.log('Evento editado exitosamente');
    } catch (error) {
      console.error('Error al editar el evento:', error);
    }
  };

  // JSX - ATLAS
  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleUpdateEvent}>
        {/* Event Name input */}
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />

        {/* Event Date input */}
        <label htmlFor="date">Event Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formatDateValue(eventData.date)}
          onChange={handleInputChange}
        />

        {/* Event Duration input */}
        <label htmlFor="duration">Event Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={eventData.duration}
          onChange={handleInputChange}
        />

        {/* Event Type input */}
        <label htmlFor="type">Event Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={eventData.type}
          onChange={handleInputChange}
        />

        {/* Event Place input */}
        <label htmlFor="place">Event Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={eventData.place}
          onChange={handleInputChange}
        />

        {/* Event Description input */}
        <label htmlFor="description">Event Description:</label>
        <input
          type="text"
          id="description"
          name="description"          
          value={eventData.description}
          onChange={handleInputChange}
        />

        {/* Event Language input */}
        <label htmlFor="language">Event Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={eventData.language}
          onChange={handleInputChange}
        />

        {/* Event Gender input */}
        <label htmlFor="gender">Event Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={eventData.gender}
          onChange={handleInputChange}
        />

        {/* Event Price Type input */}
        <label htmlFor="price_type">Event Price Type:</label>
        <input
          type="text"
          id="price_type"
          name="price_type"
          value={eventData.price_type}
          onChange={handleInputChange}
        />

        {/* Event Price input */}
        <label htmlFor="price">Event Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={eventData.price}
          onChange={handleInputChange}
        />

        {/* Event Min Age input */}
        <label htmlFor="min_age">Event Min Age:</label>
        <input
          type="number"
          id="min_age"
          name="min_age"
          value={eventData.min_age}
          onChange={handleInputChange}
        />

        {/* Event Max Age input */}
        <label htmlFor="max_age">Event Max Age:</label>
        <input
          type="number"
          id="max_age"
          name="max_age"
          value={eventData.max_age}
          onChange={handleInputChange}
        />

        {/* Event Min People input */}
        <label htmlFor="min_people">Event Min People:</label>
        <input
          type="number"
          id="min_people"
          name="min_people"
          value={eventData.min_people}
          onChange={handleInputChange}
        />

        {/* Event Max People input */}
        <label htmlFor="max_people">Event Max People:</label>
        <input
          type="number"
          id="max_people"
          name="max_people"
          value={eventData.max_people}
          onChange={handleInputChange}
        />

        {/* Event Lgtbi input */}
        <label htmlFor="lgtbi">Event Lgtbi:</label>
        <input
          type="checkbox"
          id="lgtbi"
          name="lgtbi"
          checked={eventData.lgtbi}
          onChange={handleInputChange}
        />

        {/* Event Pet input */}
        <label htmlFor="pet_friendly">Event Pet:</label>
        <input
          type="checkbox"
          id="pet_friendly"
          name="pet_friendly"
          checked={eventData.pet_friendly}
          onChange={handleInputChange}
        />

        {/* Event Kids input */}
        <label htmlFor="kid_friendly">Event Kids:</label>
        <input
          type="checkbox"
          id="kid_friendly"
          name="kid_friendly"
          checked={eventData.kid_friendly}
          onChange={handleInputChange}
        />

        {/* Event UserId input */}
        <label htmlFor="user_id">Event UserId:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={eventData.user_id}
          onChange={handleInputChange}
        />       

        {/* Submit button */}
        <button type="submit">
          Update Event
        </button>

      </form>
    </div>
  );
};

export default EditEvent;
