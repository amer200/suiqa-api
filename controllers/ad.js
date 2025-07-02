const Ad = require('../models/Ad');

exports.createAd = async(req, res) => {
    try {
        const { title, description, price, category, subcategory, condition, locationText, lat, lng, phone, whatsapp } = req.body;

        const images = req.files.map(file => file.filename);
        const ad = new Ad({
            title,
            description,
            price,
            category,
            subcategory,
            condition,
            locationText,
            locationMap: { lat, lng },
            phone,
            whatsapp,
            images,
            user: req.user.id
        });

        await ad.save();
        res.status(201).json(ad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};