import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: ''
  });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchUserById = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData({
          name: data.name,
          username: data.username,
          email: data.email
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    fetchUserById(userId);
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.username})
            <button onClick={() => handleUserClick(user.id)}>More</button>
            {selectedUser === user.id && (
              <div>
                <p>Name: {userData.name}</p>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
