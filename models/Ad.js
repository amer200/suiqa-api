const mongoose = require('mongoose');
const slugify = require('slugify');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    condition: { type: String, enum: ['new', 'used'], required: true },
    locationText: { type: String },
    locationMap: {
        lat: { type: Number },
        lng: { type: Number }
    },
    description: { type: String },
    images: [{ type: String }], // Array of image URLs
    phone: { type: String, required: true },
    whatsapp: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

// Auto-generate slug
adSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Ad', adSchema);