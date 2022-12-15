const express = require('express')
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");
const {checkRoleAdmin} = require("../middleware/check-role");

const {
    getAllPosts,
    getPostsById,
    getPostsByStatus,
    getPostsByUserId,
    createPost,
    updatePostById,
    deletePostById,
    approvePost,
} = require("../controllers/api/post.controller.js");


router.get('/', getAllPosts)
router.get('/user', getPostsByUserId)
router.get('/:id', getPostsById)
router.post('/', checkAuth, createPost)
router.put('/:id', checkAuth, updatePostById)
router.delete('/:id', checkAuth, deletePostById)
router.patch('/:id/approve', checkAuth, checkRoleAdmin, approvePost)
router.get('/status/:status', checkAuth, getPostsByStatus)

module.exports = router;