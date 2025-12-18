import React from 'react';

function UserTable({ users, onDelete }) {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th>Tên người dùng</th>
          <th>Email liên hệ</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => onDelete(user._id)} style={{ color: 'red' }}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;