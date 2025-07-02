const mongoose = require("mongoose");
const slugify = require("slugify");
const categSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
}, { timestamps: true });

categSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next()
})
module.exports = mongoose.model('Categ', categSchema);