const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Giúp fix lỗi "Không cho phép xóa" sáng nay
app.use(express.json());

// Kết nối MongoDB (Giữ nguyên link DB của Trung nhé)
mongoose.connect('mongodb+srv://trung:trung123@cluster0.mongodb.net/test')
  .then(() => console.log("Backend đã kết nối Database thành công!"))
  .catch(err => console.log("Lỗi kết nối DB: ", err));

const UserSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', UserSchema);

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

app.listen(5000, () => console.log('Server Node.js đang chạy tại: http://localhost:5000'));