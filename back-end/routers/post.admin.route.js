const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const {
    approval, getPostsByStatus
} = require("../controllers/admin/post.controller.js");

router.patch('/:id/approval', checkAuth, approval)
router.get('/status', checkAuth, getPostsByStatus)

module.exports = router;