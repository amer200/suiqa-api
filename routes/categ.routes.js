const express = require("express");
const router = express.Router();
const categControllers = require("../controllers/categ");
const authMiddlewares = require("../middlewares/auth");
router.post("/create", authMiddlewares.isAuth, authMiddlewares.isAdmin, categControllers.createCateg);

module.exports = router;