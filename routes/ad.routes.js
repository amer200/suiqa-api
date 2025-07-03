const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const adControllers = require("../controllers/ad");
const authMiddlewares = require("../middlewares/auth");


router.post("/create", authMiddlewares.isAuth, upload.array("images", 8), adControllers.createAd);
router.get("/get-all-ads", adControllers.getAllAds);
router.get("/get-ad-by-id/:id", adControllers.getAdById);
router.post("/update-ad", authMiddlewares.isAuth, upload.array("images", 8), adControllers.updateAd);
router.get("/dellet-ad/:id", authMiddlewares.isAuth, adControllers.delleteAd);
module.exports = router;