{/* eventos favoritos, creados, a los que asisto */ }
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

// Import API functions
//import { fetchUserCreatedEvents, fetchUserFavoriteEvents, fetchUserSignedUpEvents } from './api'; 

// Define mock functions to simulate API calls
// const fetchUserCreatedEvents = async () => {
//   // Simulate fetching user-created events
//   return [
//     { id: 1, name: 'Event 1' },
//     { id: 2, name: 'Event 2' },
//     // Add more mock data as needed
//   ];
// };

// const fetchUserFavoriteEvents = async () => {
//   // Simulate fetching user favorite events
//   return [
//     { id: 3, name: 'Event 3' },
//     { id: 4, name: 'Event 4' },
//     // Add more mock data as needed
//   ];
// };

// const fetchUserSignedUpEvents = async () => {
//   // Simulate fetching user signed up events
//   return [
//     { id: 5, name: 'Event 5' },
//     { id: 6, name: 'Event 6' },
//     // Add more mock data as needed
//   ];
// };


const MyEvents = () => {
  const { store, actions } = useContext(Context);
  const [userEvents, setUserEvents] = useState({
    createdEvents: [],
    favoriteEvents: [],
    signedUpEvents: []
  });

  // useEffect(() => {
  //   // Access actions from Flux store
  //   const { actions } = getState();

  //   // Fetch user-created events
  //   actions.fetchUserCreatedEvents()
  //     .then(data => setUserCreatedEvents(data))
  //     .catch(error => console.error('Error fetching user created events:', error));

  //   // Fetch user favorite events
  //   actions.fetchUserFavoriteEvents()
  //     .then(data => setUserFavoriteEvents(data))
  //     .catch(error => console.error('Error fetching user favorite events:', error));

  //   // Fetch user signed up events
  //   actions.fetchUserSignedUpEvents()
  //     .then(data => setUserSignedUpEvents(data))
  //     .catch(error => console.error('Error fetching user signed up events:', error));
  // }, []);

  useEffect(() => {
    actions.fetchUserEvents()
      .then(eventsData => setUserEvents(eventsData))
      .catch(error => console.error('Error fetching user events:', error));
  }, []);

  //JSX - ATLAS
  return (
<div className="my-events">
      <h2>My Events</h2>

      <div>
        <h3>Events Created by You</h3>
        <ul>
          {userEvents.createdEvents.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Favorite Events</h3>
        <ul>
          {userEvents.favoriteEvents.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Events You Signed Up For</h3>
        <ul>
          {userEvents.signedUpEvents.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyEvents;
