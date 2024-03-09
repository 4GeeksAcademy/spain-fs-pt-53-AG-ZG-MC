import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const EventActions = ({ eventId }) => {
  const { store, actions } = useContext(Context);

  // Access the events from the store
  const { events } = store;

  // State to manage user interaction
  const [isSignedUp, setIsSignedUp] = useState(false);

  // UseEffect to update the signup status when component mounts
  useEffect(() => {
    // Check if the user is signed up for the event
    const signedUpEvent = events.find((event) => event.id === eventId);
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

  // JSX component:
  return (
    <div>
      <h3>Event Actions</h3>
      <button onClick={handleSignUp} disabled={isSignedUp}>
        {isSignedUp ? "Already Signed Up" : "Sign Up"}
      </button>
      <button onClick={handleCancelAssistance} disabled={!isSignedUp}>
        Cancel Assistance
      </button>
      <button onClick={handleShareEvent}>Share</button>
    </div>
  );
};

export default EventActions;
