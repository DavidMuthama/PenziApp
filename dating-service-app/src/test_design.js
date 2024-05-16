import React, { useState, useEffect } from 'react';

const Users = () => {
    const [users, setUsers] = useState({});

    useEffect(() => {
        fetch('api/user/messages')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

 return (
        <div>
            <h1>Users</h1>
            <form>
            <input
          type="text"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
          placeholder="Enter 'match#20-30#Nairobi' to start"
        />
        <button type="submit">Submit Me</button>
            </form>
            <ul>
                {Array.isArray(users) ? (
                    users.map((user, index) => (
                        <li key={index}>Name: {user.name}, Age: {user.age}, Phone: {user.phone_no}</li>
                    ))
                ) : (
                    <li>Data is not an array yet</li>
                )}
            </ul>
        </div>
    );
};

export default Users;