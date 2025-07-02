const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

const app = express();

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
// // Error Handler (لو هتستخدم)
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

// DB Connection
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));