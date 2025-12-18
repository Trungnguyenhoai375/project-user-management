import React, { useEffect, useState } from 'react';
import UserTable from './UserTable'; // Nhập file bảng vào đây

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const API_URL = 'https://trung-backend.onrender.com/api/users';

  const fetchUsers = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log("Lỗi kết nối Backend: ", err));
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    }).then(() => {
      fetchUsers();
      setName('');
      setEmail('');
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Quản lý User - Cấu trúc 2 file</h1>
      <form onSubmit={addUser} style={{ marginBottom: '20px' }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên..." required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." required />
        <button type="submit">Thêm mới</button>
      </form>

      {/* Gọi file UserTable và truyền dữ liệu users vào */}
      <UserTable users={users} />
    </div>
  );
}

export default App;