const express = require('express');
const http = require("http");
const socketIo = require("socket.io")
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const Message = require("./models/Message");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})
app.use("/uploads", express.static("uploads"));
// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/ads', require('./routes/ad.routes'));
app.use('/api/admins', require('./routes/admin.routes'));
app.use('/api/categ', require('./routes/categ.routes'));
app.use('/api/comments', require('./routes/comment.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

// DB Connection
const connectDB = require('./config/db');
const { create } = require('./models/Comment');
const { Types } = require('mongoose');
connectDB();
io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`user ${socket.id} joined chat ${chatId}`)
    })
    socket.on('sendMessage', async(data) => {
        const { chatId, content, sender } = data;
        try {
            const message = new Message({
                chat: new Types.ObjectId(chatId),
                sender: new Types.ObjectId(sender),
                content
            })
            await message.save();
            socket.to(chatId).emit('receiveMessage', message);
        } catch (err) {
            console.log(err)
        }
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));