const express = require("express");
const { getAllStores, getStoresByOwner, createStore, updateStoreById, ratingStore } = require("../controllers/api/store.controller");
const checkAuth = require("../middleware/check-auth");
const {checkRoleStoreOwner} = require('../middleware/check-role')
const router = express.Router();

router.get("/", getAllStores);
router.get("/owner", checkAuth, checkRoleStoreOwner, getStoresByOwner);
router.post("/", checkAuth, createStore);
router.put("/:id", checkAuth, updateStoreById);
router.post("/rate", checkAuth, ratingStore);

module.exports = router;
