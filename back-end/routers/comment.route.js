const express = require('express')
const commentApiController = require('../controllers/api/comment.controller')
const checkAuth = require("../middleware/check-auth.js");

const router = express.Router();

router.post('/', checkAuth, commentApiController.createComment)
router.get('/post/:id', commentApiController.getListCommentsByPostID)
router.get('/', commentApiController.getAllComments)


module.exports = router
