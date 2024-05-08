import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
    const [message, setMessage] = useState('');

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:3000/api/user/messages', { message: message });
            alert(response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="name#age#gender#area#phone_no#county"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AddUser;