const express = require('express');
const commentControllers = require("../controllers/comment");
const authMiddleware = require("../middlewares/auth");
const isBlockedByAdmin = require("../middlewares/blockedUser");
const router = express.Router();

router.post("/create-comment", authMiddleware.isAuth, isBlockedByAdmin.isBlocked, commentControllers.createComment);
router.get("/get-ad-comment/:adId", commentControllers.getAdComments);
module.exports = router;