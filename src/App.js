import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const API_URL = 'https://trung-backend.onrender.com/api/users';

  const fetchUsers = () => {
    fetch(API_URL).then(res => res.json()).then(data => setUsers(data));
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    }).then(() => { fetchUsers(); setName(''); setEmail(''); });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Project 1: Quản lý User</h1>
      <form onSubmit={addUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Thêm User</button>
      </form>
      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr><th>Tên</th><th>Email</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}><td>{user.name}</td><td>{user.email}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;