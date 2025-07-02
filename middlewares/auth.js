const jwt = require("jsonwebtoken");

exports.isAuth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "غير مصرح" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "تسجيل الدخول غير صالح" });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "غير مصرح، يلزم صلاحيات الأدمن" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: "حدث خطأ داخلي في التحقق من صلاحيات الأدمن" });
    }
};