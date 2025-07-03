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

exports.createSubCateg = async(req, res) => {
    try {
        const { name, categ } = req.body;
        const sub = await SubCateg.create({ name, categ });
        res.status(201).json({
            subCateg: sub
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.getAllCateg = async(req, res) => {
    try {
        const categs = await Categ.find();
        res.status(200).json({
            categs: categs
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.getAllSubCategs = async(req, res) => {
    try {
        const subs = await SubCateg.find().populate('categ');
        res.status(200).json({
            subs: subs
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.updateCateg = async(req, res) => {
    try {
        const { name, id } = req.body;
        const categ = await Categ.findById(id);
        if (!categ) {
            return res.status(404).json({
                message: "categ not found!"
            })
        }
        categ.name = name;
        await categ.save();
        res.status(201).json({
            categ: categ
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.updateSubCateg = async(req, res) => {
    try {
        const { name, categid, id } = req.body;
        const sub = await SubCateg.findById(id);
        if (!sub) {
            return res.status(404).json({
                message: "sub categ not found!"
            })
        }
        sub.name = name;
        sub.categ = categid;
        await sub.save();
        res.status(201).json({
            sub: sub
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.delleteCateg = async(req, res) => {
    try {
        const { categid } = req.params;
        await Categ.findByIdAndDelete(categid);
        res.status(200).json({
            message: "delleted"
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.delleteSubCateg = async(req, res) => {
    try {
        const { categid } = req.params;
        await SubCateg.findByIdAndDelete(categid);
        res.status(200).json({
            message: "delleted"
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.getCategById = async(req, res) => {
    try {
        const categId = req.params.id;
        const categ = await Categ.findById(categId);
        res.status(200).json({
            categ: categ
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.getSubCategById = async(req, res) => {
    try {
        const subId = req.params.id;
        console.log(req.params)
        const sub = await SubCateg.findById(subId);
        res.status(200).json({
            sub: sub
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}