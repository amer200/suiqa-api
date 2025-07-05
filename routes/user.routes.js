const express = require('express');
const userController = require('../controllers/user');
const authMiddlewares = require("../middlewares/auth");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

//ads
router.post("/save-ad", authMiddlewares.isAuth, userController.addSavedAd);
router.get("/get-all-saved-ads", authMiddlewares.isAuth, userController.getAllSavedAd);
router.post("/remove-ad-form-saved-ad", authMiddlewares.isAuth, userController.removeAdFromSaved);
module.exports = router;