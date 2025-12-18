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
      // Dùng proxy để vượt rào cản bảo mật của Render
      const proxy = 'https://cors-anywhere.herokuapp.com/'; 
      
      fetch(`${API_URL}/${id}`, { 
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(res => {
        if (res.ok) {
          alert("Xóa thành công!");
          fetchUsers(); 
        } else {
          alert("Lỗi server: Có thể server đang bận, bạn thử lại sau 1 phút nhé!");
        }
      })
      .catch(err => {
        console.log("Lỗi: ", err);
        alert("Hiện tại chưa xóa được, hãy thử lại sau ít phút!");
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