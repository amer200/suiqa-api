exports.isBlocked = async(req, res, next) => {
    try {
        if (req.user.isblockedbyadmin) {
            return res.status(403).json({ message: "تم حظر حسابك برجاء التواصل مع الادارة" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}