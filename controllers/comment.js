const Comment = require("../models/Comment");
const { isCommentClean } = require("../utils/commentFilter");
const adUtils = require("../utils/ad");
exports.createComment = async(req, res) => {
    try {
        const { content, adId } = req.body;
        const userId = req.user.id;
        if (!isCommentClean(content)) {
            return res.status(400).json({
                message: "التعليق يحتوي على الفاظ غير لائقة"
            })
        }
        if (adUtils.isAdBlockedByAdmin(ad)) {
            return res.status(403).json({
                message: "هذا الاعلان محظور"
            })
        }
        const comment = await Comment.create({
            ad: adId,
            user: userId,
            content
        })
        res.status(201).json({
            comment: comment
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.getAdComments = async(req, res) => {
    try {
        const adId = req.params.adId;
        const comments = await Comment.find({ ad: adId }).populate('user', 'name')
        res.status(200).json({
            comments: comments
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}