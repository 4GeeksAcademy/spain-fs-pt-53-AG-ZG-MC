import React, { useContext } from 'react';
import EventCreate from '../component/EventCreate'; // Assuming EventCreate.js is located in the components folder
import { Context } from '../store/appContext';


const CreateEventPage = () => {
  const { store, actions } = useContext(Context);
  const { events } = store

  return (
    <div>
      <EventCreate />
    </div>
  );
};

export default CreateEventPage;
