import React, { useContext, useState } from "react";
import { Context } from '../store/appContext';

  
const CreateEvent = () => {
  const { actions, store } = useContext(Context); 

  const defaultLocation = "Barcelona";

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    duration: "",
    type: "",
    place: defaultLocation,
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
  });

  const handleCreateEvent = async () => {
    try {
      // Verifica si hay un usuario autenticado
      if (!store.session.isLoggedIn) {
        throw new Error("No user authenticated");
      }

      // Agrega el ID del usuario al evento
      const eventDataWithUserId = {
        ...eventData,
        user_id: store.user.id
      };

      // Envía el evento con el ID del usuario al backend
      await actions.createEvent(eventDataWithUserId);

      console.log('Evento creado exitosamente');
      // Limpiar los campos después de la creación del evento
      setEventData({
        name: "",
        date: "",
        duration: "",
        type: "",
        place: defaultLocation,
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
      });

      await actions.fetchAllEvents();
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

  return (
    <div>
      <h2>Create Event</h2>
      <form>
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
          value={eventData.date}
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

        <iframe
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9WpSu4YZXGeyeD72uuxNKM-kBpDBaCI&q=${encodeURIComponent(eventData.place)}`}
          title="Event map"
        ></iframe>
        {/* Submit button */}
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
