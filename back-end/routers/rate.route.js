const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const {
    rating
} = require("../controllers/api/rate.controller");

router.post('/store/:store_id', checkAuth, rating)

module.exports = router;