import React, { useEffect, useState } from 'react';
import UserTable from './UserTable'; 

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

  const deleteUser = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa user này?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchUsers()) 
        .catch(err => console.log("Lỗi xóa: ", err));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Quản lý User - Cấu trúc 2 file</h1>
      <form onSubmit={addUser} style={{ marginBottom: '20px' }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên..." required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." required />
        <button type="submit">Thêm mới</button>
      </form>

      {/* QUAN TRỌNG: Phải có onDelete={deleteUser} ở đây thì nút bên file kia mới chạy */}
      <UserTable users={users} onDelete={deleteUser} />
    </div>
  );
}

export default App;