const User = require("../models/User");
const jwt = require('jsonwebtoken');

const genrateToken = (id, name, email, role) => {
    return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

exports.registerUser = async(req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "المستخدم موجود بالفعل" })
        }
        const user = await User.create({ name, email, password, role })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genrateToken(user._id, user.name, user.email, user.role)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: genrateToken(user._id, user.name, user.email, user.role)
            })
        } else {
            res.status(401).json({ message: "البريد الالكتروني او كلمة المرور خطاء!" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}