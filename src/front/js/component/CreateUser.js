// CreateUser.js
import React, { useContext, useState } from "react";
import { Context } from "./appContext";

const CreateUser = () => {
    const { actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateUser = async () => {
        try {
            // Call the createUser action from flux.js
            await actions.createUser(username, password);

            // we can reset the form or perform other actions upon successful user creation
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <button type="button" onClick={handleCreateUser}>
                Create User
            </button>
        </div>
    );
};

export default CreateUser;
