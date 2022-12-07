const express = require('express')
const likeApiController = require('../controllers/api/like.controller')
const checkAuth = require("../middleware/check-auth.js");

const router = express.Router();

router.get('/post', likeApiController.getLikesOfPosts)
router.get('/comment', likeApiController.getLikesOfComments)
router.post('/post', checkAuth, likeApiController.handleLikePost)
router.post('/comment', checkAuth, likeApiController.handleLikeComment)

module.exports = router
