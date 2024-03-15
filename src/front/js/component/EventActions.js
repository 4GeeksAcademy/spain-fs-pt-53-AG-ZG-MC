import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const EventActions = ({ eventId }) => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage user interaction
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // useEffect to update isSignedUp based on events
  useEffect(() => {
    const signedUpEvent = events.find(event => event.id === eventId);
    setIsSignedUp(!!signedUpEvent);
  }, [events, eventId]);

  // Function to handle signing up for the event
  const handleSignUp = () => {
    // Call the action to sign up for the event
    actions.signUpForEvent(eventId);
    setIsSignedUp(true);
  };

  // Function to handle canceling assistance for the event
  const handleCancelAssistance = () => {
    // Call the action to cancel assistance for the event
    actions.cancelAssistance(eventId);
    setIsSignedUp(false);
  };

  // Function to handle sharing the event
  const handleShareEvent = () => {
    // Call the action to share the event
    actions.shareEvent(eventId);
  };

  // Function to handle adding event to favorites
  const handleFavorite = () => {
    // Call the action to add the event to favorites
    //add red icon
    actions.addToFavorites(eventId);
    setIsFavorite(true);
  };

  // Function to handle removing event from favorites
  const handleUnfavorite = () => {
    // Call the action to remove the event from favorites
    // icon set to white
    actions.removeFromFavorites(eventId);
    setIsFavorite(false);
  };

  // Function to see favorite events
  const handleSeeFavoriteEvents = () => {
    // Call the action to see favorite events
    actions.seeFavoriteEvents();
  };


  // JSX component - Atlas
  return (
    <div>
      <h3>Event Actions</h3>
      {/* Display an icon or text indicating sign-up status */}
      {isSignedUp ? (
        <p>You are signed up for this event</p>
      ) : (
        <button onClick={handleSignUp}>Sign Up</button>
      )}

      <button onClick={handleCancelAssistance}>Cancel Assistance</button>
      <button onClick={handleShareEvent}>Share Event</button>

      {/* Display a heart icon if the event is marked as a favorite */}
      {isFavorite ? (
        <span role="img" aria-label="Favorite">❤️</span>
      ) : (
        <button onClick={handleFavorite}>Favorite</button>
      )}

      {/* Button to remove event from favorites */}
      {isFavorite && (
        <button onClick={handleUnfavorite}>Remove from Favorites</button>
      )}

      <button onClick={handleSeeFavoriteEvents}>See Favorite Events</button>
    </div>
  );
};

export default EventActions;
