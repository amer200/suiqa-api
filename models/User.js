const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["buyer", "seller", "admin"],
        default: "buyer"
    },
    isblockedbyadmin: {
        type: Boolean,
        default: false
    },
    savedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ad" }]
}, { timestamps: true });
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.matchPassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
};

module.exports = mongoose.model('User', userSchema);