const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			events: [], // Add an empty array to store events
		},
		actions: {
			// Other actions...

			fetchInitialEvents: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events");
					const data = await response.json();
					setStore({ events: data }); // Set the fetched events in the store
					return data;
				} catch (error) {
					console.error("Error fetching events from backend", error);
				}
			},
		},
	};
};

export default getState;
