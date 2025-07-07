const express = require("express");
const chatControllers = require("../controllers/chat.js");
const authMiddlewares = require("../middlewares/auth.js");
const router = express.Router();

router.post('/start', authMiddlewares.isAuth, chatControllers.startChat);
router.post('/send-message', authMiddlewares.isAuth, chatControllers.sendMessage);
router.get('/get-messages/:chatId', authMiddlewares.isAuth, chatControllers.getMessages);
module.exports = router;