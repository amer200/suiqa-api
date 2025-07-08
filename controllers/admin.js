const Admin = require("../models/Admin");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const genrateToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

exports.loginAdmin = async(req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (admin && (await admin.matchPassword(password))) {
            res.status(200).json({
                _id: admin._id,
                username: admin.username,
                role: "admin",
                token: genrateToken(admin.id, admin.username, "admin")
            })
        } else {
            res.status(401).json({ message: "البريد الالكتروني او كلمة المرور خطاء!" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//users
exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            users: users
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.toggleBlockUser = async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        user.isblockedbyadmin = !user.isblockedbyadmin;
        await user.save();
        res.status(200).json({
            user: user
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}