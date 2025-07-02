const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const adControllers = require("../controllers/ad");
const authMiddlewares = require("../middlewares/auth");
router.post("/create", authMiddlewares.isAuth, upload.array("images", 8), adControllers.createAd);

module.exports = router;