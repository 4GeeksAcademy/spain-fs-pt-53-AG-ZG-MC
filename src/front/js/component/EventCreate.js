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

      // await actions.fetchAllEvents();
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
    <div className="createbarPosition">
      <div className="createbarContainer centeredWebContent">
      <div className="tittleCentered"><h2 className="tittleHeaderWrap">Create Event</h2></div>
      <div>
      <form className="filterContainerWrap2">
        {/* Event Name input */}
        <div className="filterContainer">
        <label htmlFor="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Date input */}
        <div className="filterContainer">
        <label htmlFor="date">Event Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Duration input */}
        <div className="filterContainer">
        <label htmlFor="duration">Event Duration:</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={eventData.duration}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Type input */}
        <div className="filterContainer">
        <label htmlFor="type">Event Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={eventData.type}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Place input */}
        <div className="filterContainer">
        <label htmlFor="place">Event Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={eventData.place}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Description input */}
        <div className="filterContainer">
        <label htmlFor="description">Event Description:</label>
        <input
          type="text"
          id="description"
          name="description"          
          value={eventData.description}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Language input */}
        <div className="filterContainer">
        <label htmlFor="language">Event Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={eventData.language}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Gender input */}
        <div className="filterContainer">
        <label htmlFor="gender">Event Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={eventData.gender}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Price Type input */}
        <div className="filterContainer">
        <label htmlFor="price_type">Event Price Type:</label>
        <input
          type="text"
          id="price_type"
          name="price_type"
          value={eventData.price_type}
          onChange={handleInputChange}
        />  
        </div>
        {/* Event Price input */}
        <div className="filterContainer">
        <label htmlFor="price">Event Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={eventData.price}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Min Age input */}
        <div className="filterContainer">
        <label htmlFor="min_age">Event Min Age:</label>
        <input
          type="number"
          id="min_age"
          name="min_age"
          value={eventData.min_age}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Max Age input */}
        <div className="filterContainer">
        <label htmlFor="max_age">Event Max Age:</label>
        <input
          type="number"
          id="max_age"
          name="max_age"
          value={eventData.max_age}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Min People input */}
        <div className="filterContainer">
        <label htmlFor="min_people">Event Min People:</label>
        <input
          type="number"
          id="min_people"
          name="min_people"
          value={eventData.min_people}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Max People input */}
        <div className="filterContainer">
        <label htmlFor="max_people">Event Max People:</label>
        <input
          type="number"
          id="max_people"
          name="max_people"
          value={eventData.max_people}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Lgtbi input */}
        <div className="filterContainer">
        <label htmlFor="lgtbi">Event Lgtbi:</label>
        <input
          type="checkbox"
          id="lgtbi"
          name="lgtbi"
          checked={eventData.lgtbi}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Pet input */}
        <div className="filterContainer">
        <label htmlFor="pet_friendly">Event Pet:</label>
        <input
          type="checkbox"
          id="pet_friendly"
          name="pet_friendly"
          checked={eventData.pet_friendly}
          onChange={handleInputChange}
        />
        </div>
        {/* Event Kids input */}
        <div className="filterContainer">
        <label htmlFor="kid_friendly">Event Kids:</label>
        <input
          type="checkbox"
          id="kid_friendly"
          name="kid_friendly"
          checked={eventData.kid_friendly}
          onChange={handleInputChange}
        />
        </div>
        <div className="centeredMap">
        <iframe
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9WpSu4YZXGeyeD72uuxNKM-kBpDBaCI&q=${encodeURIComponent(eventData.place)}`}
          title="Event map"
        ></iframe>
        </div>
        
        {/* Submit button */}
        <div className="filterButtonContainer">
        <button className="showFilterButton" type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default CreateEvent;
