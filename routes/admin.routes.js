const express = require('express');
const adminController = require('../controllers/admin');
const authMiddlewares = require("../middlewares/auth");
const router = express.Router();

router.post("/login", adminController.loginAdmin);

//users
router.get("/get-all-users", authMiddlewares.isAuth, authMiddlewares.isAdmin, adminController.getAllUsers);
router.get("/toggle-block-user/:userId", authMiddlewares.isAuth, authMiddlewares.isAdmin, adminController.toggleBlockUser);

//ads
router.get("/toggle-block-ad/:adId", authMiddlewares.isAuth, authMiddlewares.isAdmin, adminController.toggleBlockAd);
router.get("/get-blocked-ads", authMiddlewares.isAuth, authMiddlewares.isAdmin, adminController.getBlockedAds)
module.exports = router;