const express = require("express");
const { getAllStores, createStore, updateStoreById, ratingStore } = require("../controllers/api/store.controller");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/", getAllStores);
router.post("/", checkAuth, createStore);
router.put("/:id", checkAuth, updateStoreById);
router.post("/rate", checkAuth, ratingStore);

module.exports = router;
