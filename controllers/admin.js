const Admin = require("../models/Admin");
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