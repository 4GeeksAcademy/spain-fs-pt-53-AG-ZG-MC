import React, { useContext, useState } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
  
const CreateEvent = () => {
  const { actions, store } = useContext(Context); 
  const navigate = useNavigate();
  const defaultLocation = "Barcelona";

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    duration: "",
    type: "nature",
    place: defaultLocation,
    description: "",
    language: "english",
    gender: "all_genders",
    price_type: "free",
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
      
      if (!store.session.isLoggedIn) {
        throw new Error("No user authenticated");
      }

      
      const eventDataWithUserId = {
        ...eventData,
        user_id: store.user.id
      };
      
      await actions.createEvent(eventDataWithUserId);

      
      
      setEventData({
        name: "",
        date: "",
        duration: "",
        type: "nature",
        place: defaultLocation,
        description: "",
        language: "english",
        gender: "all_genders",
        price_type: "free",
        price: "",
        min_age: "",
        max_age: "",
        min_people: "",
        max_people: "",
        lgtbi: false,
        pet_friendly: false,
        kid_friendly: false,
      });

      navigate('/events');
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
      <div className="tittleCenteredE"><h2 className="tittleHeaderWrap">Create Event</h2></div>
      <div>
      <form className="filterContainerWrap2">
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="name">Title*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="date">Date*</label>
        <input
          type="date"
          id="date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />
        </div>
      
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="duration">Duration*</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={eventData.duration}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="type">Type*</label>
        <select
          type="text"
          id="type"
          name="type"
          value={eventData.type}
          onChange={handleInputChange}
        >
          <option value="nature">Nature</option>
          <option value="party">Party</option>
          <option value="culture">Culture</option>
          <option value="relax">Relax</option>
          <option value="family">Family</option>
          <option value="sport">Sport</option>
        </select>
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="place">Place*</label>
        <input
          type="text"
          id="place"
          name="place"
          value={eventData.place}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="description">Description*</label>
        <input
          type="text"
          id="description"
          name="description"          
          value={eventData.description}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="language">Language</label>
        <select
          type="text"
          id="language"
          name="language"
          value={eventData.language}
          onChange={handleInputChange}
        >
          <option value="spanish">Spanish</option>
          <option value="catalan">Catalan</option>
          <option value="english">English</option>
          <option value="german">German</option>
          <option value="french">French</option>
        </select>
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="gender">Gender*</label>
        <select
          type="text"
          id="gender"
          name="gender"
          value={eventData.gender}
          onChange={handleInputChange}
        >
          <option value="all_genders">All genders</option>
          <option value="female_only">Female only</option>
          <option value="queer_only">Queer only</option>
        </select>
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="price_type">Price Type*</label>
        <select
          type="text"
          id="price_type"
          name="price_type"
          value={eventData.price_type}
          onChange={handleInputChange}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>  
        </div>
      
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={eventData.price}
          onChange={handleInputChange}
        />
        </div>
       
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="min_age">Min Age</label>
        <input
          type="number"
          id="min_age"
          name="min_age"
          value={eventData.min_age}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="max_age">Max Age</label>
        <input
          type="number"
          id="max_age"
          name="max_age"
          value={eventData.max_age}
          onChange={handleInputChange}
        />
        </div>
       
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="min_people">Min People</label>
        <input
          type="number"
          id="min_people"
          name="min_people"
          value={eventData.min_people}
          onChange={handleInputChange}
        />
        </div>
        
        <div className="filterContainerR">
        <label className="labelSpace" htmlFor="max_people">Max People</label>
        <input
          type="number"
          id="max_people"
          name="max_people"
          value={eventData.max_people}
          onChange={handleInputChange}
        />
        </div>
       
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="lgtbi">LGTBI</label>
        <input
          type="checkbox"
          id="lgtbi"
          name="lgtbi"
          checked={eventData.lgtbi}
          onChange={handleInputChange}
        />
        </div>
       
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="pet_friendly">Pet friendly</label>
        <input
          type="checkbox"
          id="pet_friendly"
          name="pet_friendly"
          checked={eventData.pet_friendly}
          onChange={handleInputChange}
        />
        </div>
      
        <div className="filterContainerE">
        <label className="labelSpace" htmlFor="kid_friendly">Kids friendly</label>
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
