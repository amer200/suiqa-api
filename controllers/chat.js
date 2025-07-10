const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Ad = require('../models/Ad');
const adUtils = require("../utils/ad");
exports.startChat = async(req, res) => {
    const { adId } = req.body;
    const userId = req.user.id;
    const ad = await Ad.findById(adId).populate('user');
    const recever = ad.user;

    if (adUtils.isAdBlockedByAdmin(ad)) {
        return res.status(403).json({
            message: "هذا الاعلان  محظور لا يمكنه استلام رسالتك الان"
        })
    }
    try {
        if (recever.isblockedbyadmin) {
            return res.status(403).json({
                message: "هذا المستخدم محظور لا يمكنه استلام رسالتك الان"
            })
        }
        let chat = await Chat.findOne({
            ad: adId,
            participants: { $all: [userId] },
        });

        if (!chat) {
            chat = await Chat.create({
                ad: adId,
                participants: [userId],
            });
        }

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.sendMessage = async(req, res) => {
    const { chatId, content } = req.body;
    const sender = req.user.id;
    try {
        const newMessage = await Message.create({
            chat: chatId,
            content,
            sender,
        });

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getMessages = async(req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chat: chatId }).populate('sender');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};