const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    ad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ad',
        required: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, ],
}, {
    timestamps: true,
});
module.exports = mongoose.model('Chat', chatSchema);