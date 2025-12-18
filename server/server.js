const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb+srv://trung:trung123@cluster0.mongodb.net/test')
  .then(() => console.log("Backend đã kết nối Database thành công!"))
  .catch(err => console.log("Lỗi kết nối DB: ", err));

const UserSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', UserSchema);

// Đường dẫn kiểm tra server
// Thêm đoạn này để khi vào link chính không bị báo lỗi "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Server Node.js của Trung đã hoạt động Online!');
});

// Các API bên dưới giữ nguyên...

// Các API xử lý dữ liệu
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Xóa thành công!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi Server" });
    }
});

// Cấu hình Port cho Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại cổng: ${PORT}`));