const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const adControllers = require("../controllers/ad");
const authMiddlewares = require("../middlewares/auth");
const isBlockedByAdmin = require("../middlewares/blockedUser");


router.post("/create", authMiddlewares.isAuth, isBlockedByAdmin.isBlocked, upload.array("images", 8), adControllers.createAd);
router.get("/get-all-ads", adControllers.getAllAds);
router.get("/get-ad-by-id/:id", adControllers.getAdById);
router.post("/update-ad", authMiddlewares.isAuth, isBlockedByAdmin.isBlocked, upload.array("images", 8), adControllers.updateAd);
router.get("/dellet-ad/:id", authMiddlewares.isAuth, isBlockedByAdmin.isBlocked, adControllers.delleteAd);
router.get("/get-ad-by-slug/:slug", adControllers.getAdBySlug);
router.get("/get-user-ads", authMiddlewares.isAuth, adControllers.getUserAds);
module.exports = router;