const Categ = require("../models/Categ");
const SubCateg = require("../models/SubCateg");

exports.createCateg = async(req, res) => {
    try {
        const { name } = req.body;
        const categ = await Categ.create({ name });
        res.status(201).json({
            categ: categ
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}