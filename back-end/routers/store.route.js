const express = require('express')
const storeApiController = require('../controllers/api/store.controller')
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get('/', checkAuth, storeApiController.getAllStores)
router.post('/', storeApiController.create)
router.put('/:id', storeApiController.updateById)

module.exports = router