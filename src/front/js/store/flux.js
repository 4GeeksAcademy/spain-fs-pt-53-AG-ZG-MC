const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			users: [],
			user: null,
			events: [], // Add an empty array to store events
			recommendedEvents: [],
			session: {
				isLoggedIn: false,
				username: null,
				accessToken: null,
				// Add other session-related data as needed
			},
			passwordRecovery: {
				isPasswordRecoverySent: false,
				error: null,
			},
		},
		actions: {
			// Other actions?...
			handleCreateUser: async (firstName, lastName, username, email, password, confirmPassword) => {
				try {
					// Implement the logic to create a user in the backend
					const userData = {
						first_name: firstName,
						last_name: lastName,
						username,
						email,
						password,
						confirm_password: confirmPassword
					};

					const response = await fetch(process.env.BACKEND_URL + "/api/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					});

					if (!response.ok) {
						throw new Error("Error creating user");
					}

					// Optionally, handle the response data or update the store
					const data = await response.json();
					console.log("User created successfully:", data);

				} catch (error) {
					console.error("Error creating user", error);
					throw error; // Propagate the error to the caller if needed
				}
			},

			fetchAllUsers: async () => {
				try {
					//replace API with ours
					const response = await fetch(`${process.env.BACKEND_URL}/api/allusers`);
					// console.log("Response status fetchAllUsers:", response.status); // Agregar esto para verificar el estado de la respuesta
					if (!response.ok) {
						throw new Error('Failed to fetch users');
					}
					const data = await response.json();
					// console.log("Data from fetchAllUsers:", data); // Agregar este console.log para verificar los datos recibidos

					// Update the store with the fetched events
					setStore({
						users: data
					});
				} catch (error) {
					console.error('Error fetching events', error);
					// Handle the error as needed
				}
			},

			fetchUserProfile: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`, // Include authorization token if required
						}
					});

					// console.log("Request URL:", `${process.env.BACKEND_URL}/api/users`);
					// console.log("Request Headers:", {
					// 	'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
					// });

					if (!response.ok) {
						throw new Error('Failed to fetch user profile');
					}

					const data = await response.json();

					// console.log("User Profile Data:", data);

					// Update the store with the fetched user profile data
					setStore({
						user: data,
						}
					);
					// console.log("User Profile Data:", data);

					return data;
				} catch (error) {
					console.error('Error fetching user profile:', error);
					throw error;
				}
			},

			editUserProfile: async (updatedProfileData) => {
				try {
					// Make a PUT request to update the user's profile in the backend
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: 'PUT',
						headers: {
							// COMENTADO ALONDRA. 
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						body: JSON.stringify(updatedProfileData)
					});

					if (!response.ok) {
						throw new Error('Failed to edit user profile');
					}

					// AÑADIDO ALONDRA. Estaba el comentario ya. Optionally, parse the response JSON and return any updated profile data
					const data = await response.json();
					console.log('User profile updated successfully:', data);

					// AÑADIDO ALONDRA
					return data; // Devuelve los datos actualizados del perfil si es necesario
				} catch (error) {
					console.error('Error editing user profile:', error);
					throw error;
				}
			},
			
			syncroniseToken: async () => {
				const token = localStorage.getItem("access_token");

				if (token) {
					setStore({
						session: {
							isLoggedIn: true,
							accessToken: token,
						}
					})
				}
			},
			// AÑADIDO ALONDRA PARCIAL. Función para realizar el login
			login: async (username, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username, password }),
					});

					if (!response.ok) {
						throw new Error('Failed to login');
					}

					const data = await response.json();

					localStorage.setItem("access_token", data.token)

					console.log('Login successful. Data:', data); // Agregar un console.log para verificar los datos recibidos del backend

				// Set session state if authentication is successful
					setStore({session: {
						isLoggedIn: true,
						username: data.username,
						accessToken: data.token,
					}}); 	
				} catch (error) {
					console.error('Error logging in:', error);
					throw error;
				}
			},

			// AÑADIDO ALONDRA. Función para realizar el logout
			logout: async () => {
				try {
					// Llama al endpoint de logout
					const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
					});

					if (!response.ok) {
						throw new Error('Failed to logout');
					}

					// Elimina el token de acceso del almacenamiento local
					localStorage.removeItem('access_token');

					console.log('Logout successful.');
					// Actualiza el estado de la sesión
					setStore({session: {
						isLoggedIn: false,
						username: null,
						accessToken: null,
					}});    				
				} catch (error) {
					console.error('Error logging out:', error);
					throw error;
				}
			},

			initiatePasswordRecovery: async (username) => {
				try {
					// Logic to initiate password recovery process
					// Update passwordRecovery state based on the outcome
					setStore(prevState => ({
						...prevState,
						passwordRecovery: {
							isPasswordRecoverySent: true,
							error: null,
						},
					}));
				} catch (error) {
					console.error('Error initiating password recovery:', error);
					// Update passwordRecovery state with error information if needed
					setStore(prevState => ({
						...prevState,
						passwordRecovery: {
							isPasswordRecoverySent: false,
							error: error.message,
						},
					}));
					throw error;
				}
			},

			clearPasswordRecoveryState: () => {
				// Clear passwordRecovery state after password recovery process is complete or cancelled
				setStore(prevState => ({
					...prevState,
					passwordRecovery: {
						isPasswordRecoverySent: false,
						error: null,
					},
				}));
			},

			createEvent: async (newEvent) => {

				try {
					// Implement logic to create a new event in the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						body: JSON.stringify(newEvent),
					});

					if (!response.ok) {
						throw new Error("Error creating event");
					}

					// Optionally, handle the response data or update the store
					const data = await response.json();
					console.log("Event created successfully:", data);

					// Update the store to include the newly created event:
					setStore(prevState => {
						return { ...prevState, events: [...prevState.events, data] };
					});

				} catch (error) {
					console.error("Error creating event", error);
					throw error;
				}
			},

			editEvent: async (eventId, updatedEvent) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					  'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
					},
					body: JSON.stringify(updatedEvent),
				  });
			  
				  if (!response.ok) {
					throw new Error("Error updating event");
				  }
			  
				  const data = await response.json();
				  console.log("Event updated successfully:", data);
			  
				  return data; // Devuelve los datos actualizados del evento si es necesario
				} catch (error) {
				  console.error("Error updating event", error);
				  throw error;
				}
			},
			  
			// editEvent: async (eventId, updatedEvent) => {
			// 	try {
			// 		// logic to update the existing event in the backend, Replace API
			// 		console.log('Updating event:', eventId, updatedEvent); // Agregar este console.log()
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
			// 			method: "PUT",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
			// 			},
			// 			body: JSON.stringify(updatedEvent),
			// 		});

			// 		if (!response.ok) {
			// 			throw new Error("Error updating event");
			// 		}

			// 		// handle the response data or update the store
			// 		const data = await response.json();
			// 		console.log("Event updated successfully:", data);

			// 		// Update the store to reflect the updated event
			// 		setStore(prevState => {
			// 			const updatedEvents = prevState.events.map(event => {
			// 				if (event.id === eventId) {
			// 					return { ...event, ...data };
			// 				}
			// 				return event;
			// 			});
			// 			return { ...prevState, events: updatedEvents };
			// 		});

			// 	} catch (error) {
			// 		console.error("Error updating event", error);
			// 		throw error;
			// 	}
			// },

			getMessage: async () => {
				try {
					// Implement the logic to fetch the message from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await response.json();
					setStore({ message: data }); // Set the fetched message in the store
					return data;
				} catch (error) {
					console.error("Error fetching message from backend", error);
				}
			},

			signUpForEvent: async (eventId) => {
				try {
					//correct backend logic as needed to signup for event
					//replace the placeholder URL (${process.env.BACKEND_URL}/api/user/profile) 
					// with the actual endpoint of backend API that handles user profile updates.
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						// include any other data we need
					});

					//checks if request was successful:
					if (!response.ok) {
						throw new Error('Failed to sign up for the event');
					}

					// handle the response data if needed
					//console.log(`Signed up for event ${eventId}`);
					const responseData = await response.json();
					console.log('Sign up response:', responseData);

					// Update the database or other needed actions to save the sign-up info
					// Placeholder code to update the database and perform other actions
					// Example: Update the user's profile or event attendance status
					const userData = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
						body: JSON.stringify({
							eventId,
							status: 'attending' // User's status updated to: 'attending' for the event
						})
					});
					if (!userData.ok) {
						throw new Error('Failed to update user profile');
					}
					console.log('User profile updated successfully');

					// Update the store to reflect the user's sign-up status for the event
					setStore(prevState => {
						// Find the event in the events array and update its sign-up status
						const updatedEvents = prevState.events.map(event => {
							if (event.id === eventId) {
								return { ...event, isSignedUp: true };
							}
							return event;
						});
						return { ...prevState, events: updatedEvents };
					});


				} catch (error) {
					console.error('Error signing up for the event', error);
					throw error;
				}
			},

			// AÑADIDO ALONDRA. He añadido userId en el async () 
			cancelAssistance: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/signup`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to cancel assistance for the event');
					}
					console.log(`Canceled assistance for event ${eventId}`);
				} catch (error) {
					console.error('Error canceling assistance for the event', error);
					throw error;
				}
			},

			fetchEventDetails: async (eventId) => {
				try {
					//correct backend logic as needed to fetch EventDetails
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						// AÑADIDO ALONDRA. Faltaba la autentificación por token
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});

					// AÑADIDO ALONDRA. 
					if (!response.ok) {
						throw new Error('Failed to fetch event details');
					}

					const data = await response.json();

					// AÑADIDO ALONDRA.
					// Verificar si el cuerpo de la respuesta contiene datos válidos
					if (!data || Object.keys(data).length === 0) {
						throw new Error('Empty or unexpected response data');
					}

					setStore({ eventDetails: data }); // Set the fetched event details in the store

					return data;
				} catch (error) {
					console.error(`Error fetching event details for event ${eventId}`, error);
				}
			},

			getAttendeesCount: async (eventId) => {
				try {
					// coorect backend logic to fetch number of attendees for the event
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/users`, {
						// AÑADIDO ALONDRA. Faltaba la autentificación por token
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch event attendees');
					}
					const data = await response.json();
					// COMENTADO ALONDRA
					// console.log(`Attendees count for event ${eventId}:`, data.count);
					// return data.count;
					console.log(`Attendees for event ${eventId}:`, data);
					return data;
				} catch (error) {
					console.error("Error fetching attendees count", error);
					throw error; // Propagate the error to the caller if needed
				}
			},

			fetchEventRecommended: async () => {
				try {
					//correct backend logic as needed to see recommended events
					const response = await fetch(process.env.BACKEND_URL + "/api/events/recommended");
					// console.log("Response status recommended events:", response.status); // Agregar esto para verificar el estado de la respuesta
					if (!response.ok) {
						throw new Error('Failed to fetch recommended events');
					}
					const data = await response.json();
					// AÑADIDO ALONDRA.
					// console.log("Data from Event Recommended:", data); // Agregar este console.log para verificar los datos recibidos
					// CAMBIO ALONDRA 
					setStore({ recommendedEvents: data }); // Set the fetched events in the store
					// setStore({ events: data }); // Set the fetched events in the store
					return data; // Devolver los datos obtenidos
				} catch (error) {
					console.error("Error fetching events from backend", error);
				}
			},

			fetchAllEvents: async () => {
				try {
					//replace API with ours
					const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
					// console.log("Response status:", response.status); // Agregar esto para verificar el estado de la respuesta
					if (!response.ok) {
						throw new Error('Failed to fetch events');
					}
					const data = await response.json();
					console.log("Data from fetchAllEvents:", data); // Agregar este console.log para verificar los datos recibidos

					// Update the store with the fetched events
					setStore({
						events: data
					});
				} catch (error) {
					console.error('Error fetching events', error);
					// Handle the error as needed
				}
			},

			deleteUser: async () => {
				try {
					// Realiza una solicitud DELETE al backend para eliminar un usuario específico
					const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});

					if (!response.ok) {
						throw new Error('Failed to delete user');
					}

					// Maneja la respuesta si es necesario
					console.log('User deleted successfully');

				} catch (error) {
					console.error('Error deleting user:', error);
					throw error;
				}
			},

			deleteEvent: async (eventId) => {
				try {
					// Realiza una solicitud DELETE al backend para eliminar un evento específico
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});

					if (!response.ok) {
						throw new Error('Failed to delete event');
					}

					// Maneja la respuesta si es necesario
					console.log('Event deleted successfully');

				} catch (error) {
					console.error('Error deleting event:', error);
					throw error;
				}
			},

			getEventsByUser: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch events by user');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching events by user:", error);
					throw error;
				}
			},

			getUsersByEvent: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/users`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch users by event');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching users by event:", error);
					throw error;
				}
			},

			addEventToFavorites: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/favorite`, {
						method: "POST",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to add event to favorites');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error adding event to favorites:", error);
					throw error;
				}
			},

			removeEventFromFavorites: async (eventId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/events/${eventId}/favorite`, {
						method: "DELETE",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to remove event from favorites');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error removing event from favorites:", error);
					throw error;
				}
			},

			getUserFavoriteEvents: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/favorite_event`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
						}
					});
					if (!response.ok) {
						throw new Error('Failed to fetch user favorite events');
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching user favorite events:", error);
					throw error;
				}
			},

			// searchEventsByType: async (eventType) => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/events/search?type=${eventType}`);
			// 		const data = await response.json();
			// 		return data;
			// 	} catch (error) {
			// 		console.error("Error searching events by type:", error);
			// 		throw new Error("Error searching events by type");
			// 	}
			// },

			filterEvents: async (filters) => {
				try {
					const queryString = new URLSearchParams(filters).toString();
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/filter?${queryString}`);
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error filtering events:", error);
					throw new Error("Error filtering events");
				}
			},
		},
	};
};

export default getState;


