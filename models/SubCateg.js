const mongoose = require("mongoose");
const slugify = require("slugify");
const subCategSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    categ: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categ',
        unique: true,
        required: true,

    },
}, { timestamps: true });
subCategSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next()
})
module.exports = mongoose.model('SubCateg', subCategSchema);