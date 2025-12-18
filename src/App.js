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

  // Hàm xóa này sẽ gửi yêu cầu lên Render
  const deleteUser = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa user này không?')) {
      fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors' // Ép buộc chế độ kết nối chéo để vượt lỗi
      })
      .then(res => {
        if (res.ok) {
          alert("Đã xóa thành công!");
          fetchUsers(); 
        } else {
          // Nếu lỗi 404, có thể do id không đúng định dạng
          alert("Lỗi: Server không tìm thấy dữ liệu này để xóa!");
        }
      })
      .catch(err => {
        console.error("Lỗi xóa:", err);
        alert("Không thể kết nối đến Server để xóa!");
      });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Quản lý User - Project 1</h1>
      <form onSubmit={addUser} style={{ marginBottom: '20px' }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên..." required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." required />
        <button type="submit">Thêm mới</button>
      </form>

      {/* Truyền cả danh sách users và hàm xóa vào Table */}
      <UserTable users={users} onDelete={deleteUser} />
    </div>
  );
}

export default App;