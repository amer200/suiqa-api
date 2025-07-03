const Ad = require('../models/Ad');
const fs = require("fs");
const path = require("path");

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
exports.getAllAds = async(req, res) => {
    try {
        const ads = await Ad.find().populate('category').populate('subcategory');
        res.status(200).json({
            ads: ads
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
exports.getAdById = async(req, res) => {
    try {
        const id = req.params.id;
        const ad = await Ad.findById(id).populate('category').populate('subcategory');
        res.status(200).json({
            ad: ad
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
exports.updateAd = async(req, res) => {
    try {
        const { title, description, price, category, subcategory, condition, locationText, lat, lng, phone, whatsapp, id } = req.body;
        const ad = await Ad.findById(id);
        if (!ad.user == req.user.id) {
            return res.status(403).json({
                message: "not allowed"
            })
        }
        ad.title = title;
        ad.description = description;
        ad.price = price;
        ad.category = category;
        ad.subcategory = subcategory;
        ad.condition = condition;
        ad.locationText = locationText;
        ad.locationMap = { lat, lng };
        ad.phone = phone;
        ad.whatsapp = whatsapp;
        if (req.files && req.files.length > 0) {
            ad.images.forEach(imagePath => {
                const fullPath = `/uploads/${imagePath}`;
                fs.unlink(fullPath, err => {
                    if (err) {
                        console.error(`فشل في حذف الصورة ${imagePath}:`, err.message);
                    }
                });
            });
            let images = req.files.map(file => file.filename);
            ad.images = images;
            await ad.save();
            res.status(200).json({
                ad: ad
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

exports.delleteAd = async(req, res) => {
    try {
        const id = req.params.id;
        await Ad.findByIdAndDelete(id);
        res.status(200).json({
            message: "delleted"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}