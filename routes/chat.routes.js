const express = require("express");
const chatControllers = require("../controllers/chat.js");
const authMiddlewares = require("../middlewares/auth.js");
const isBlockedByAdmin = require("../middlewares/blockedUser");
const router = express.Router();

router.post('/start', authMiddlewares.isAuth, isBlockedByAdmin.isBlocked, chatControllers.startChat);
router.post('/send-message', authMiddlewares.isAuth, isBlockedByAdmin.isBlocked, chatControllers.sendMessage);
router.get('/get-messages/:chatId', authMiddlewares.isAuth, chatControllers.getMessages);
module.exports = router;