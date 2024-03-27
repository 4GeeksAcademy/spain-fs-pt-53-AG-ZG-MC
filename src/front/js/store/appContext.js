import React, { useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = React.createContext(null);


const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState(prevState => ({
					...prevState,
					store: { ...prevState.store, ...updatedStore },
					actions: { ...prevState.actions }
				}))
			})
		);

		useEffect(() => {
			const fetchData = async () => {
				try {
					await state.actions.fetchAllEvents();
					await state.actions.fetchAllUsers();
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};
			fetchData();
			state.actions.syncroniseToken();
		}, []);


		
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
