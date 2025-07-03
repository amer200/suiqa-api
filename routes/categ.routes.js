const express = require("express");
const router = express.Router();
const categControllers = require("../controllers/categ");
const authMiddlewares = require("../middlewares/auth");

//categs
router.post("/create", authMiddlewares.isAuth, authMiddlewares.isAdmin, categControllers.createCateg);
router.get('/get-all-categs', categControllers.getAllCateg);
router.post('/update-categ', authMiddlewares.isAuth, authMiddlewares.isAdmin, categControllers.updateCateg);
router.get('/dellete-categ/:id', authMiddlewares.isAdmin, authMiddlewares.isAdmin, categControllers.delleteCateg);
router.get('/get-categ/:id', categControllers.getCategById)
    //sub categ
router.post('/create-sub-categ', authMiddlewares.isAuth, authMiddlewares.isAdmin, categControllers.createSubCateg);
router.get('/get-all-sub-categs', categControllers.getAllSubCategs);
router.post('/update-sub-categ', authMiddlewares.isAuth, authMiddlewares.isAdmin, categControllers.updateSubCateg);
router.get('/dellete-sub-categ/:id', authMiddlewares.isAdmin, authMiddlewares.isAdmin, categControllers.delleteSubCateg);
router.get('/get-sub-categ/:id', categControllers.getSubCategById);

module.exports = router;