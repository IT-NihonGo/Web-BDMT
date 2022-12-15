const models = require('../../models/index')
const STATUS = require('../../constant/status')
const REVIEWER = 3
const STORE_OWNER = 3
const ADMIN = 3
const {
    getAllPost,
    showByPostStatus
} = require('../CRUD/post')
const index = async (req, res) => {
    try {
        const params = {
            txt_search: req.query.txt_search
                ? req.query.txt_search.trim()
                : '',
        }

        const posts = await getAllPost(params)
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
};
const approvePost = async (request, response) => {
    const postID = request.params.id
    const status = request.body.status
    // Check status
    if (status !== STATUS.APPROVED && status !== STATUS.REJECTED) {
        return response.status(400).json({
            message: 'invalid status!'
        })
    }

    // Check post exist
    const post = await models.Post.findByPk(postID);
    if (!post) {
        return response.status(404).json({
            message: 'Post not found!',
        })
    }

    // Update status
    try {
        models.Post.update({status: status}, { where: { id: postID } })
        const message = status === STATUS.APPROVED ? 'Approve post successfully!' : 'Rejected post successfully!'
        return response.status(200).json({
            message: message,
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong !',
            error: error.toString(),
        })
    }
}

const showByStatus = async (request, response) => {
    const role = request.user.role_id
    const status = request.params.status

    // Check status
    if (status !== STATUS.APPROVED && status !== STATUS.REJECTED && status !== STATUS.PENDING && status !== "") {
        return response.status(400).json({
            message: 'invalid status!'
        })
    }

    // Get list
    try {
        const posts = await showByPostStatus(status)
        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error.toString(),
        })
    }
}
const showById = async (req, res) => {
    try {
        const post = await models.Post.findByPk(req.params.id)
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
};

const showByUserId = async (req, res) => {
    try {
        const post = await models.Post.findAll({ where: { user_id: req.body.user_id } })
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
};

const create = async (req, res) => {
    try {
        const newPost = {
            user_id: req.user.user_id,
            store_id: req.body.store_id,
            title: req.body.title,
            content: req.body.content,
            status: STATUS.PENDING,
            images: [],
        }
        const post = await models.Post.create(newPost)
        return res.status(201).json({
            message: 'Create post successfully!',
            post,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Something went wrong!',
            error: err,
        })
    }
};

const update = async (req, res) => {
    try {
        const post = await models.Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found!',
            })
        }
        
        if (req.user.role_id !== ADMIN && req.user.user_id !== req.body.user_id){
            return res.status(404).json({
                message: 'Can not update this post!',
            })
        }
        const updatePost = {
            title: req.body.title,
            content: req.body.content,
        }
        models.Post.update(updatePost, { where: { id: req.params.id } })
        return res.status(201).json({
            message: 'Update post successfully!',
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong !',
            error: error,
        })
    }
};

const destroy = async (req, res) => {
    try {
        const post = await models.Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found!',
            })
        }
        if (req.user.role_id !== ADMIN && req.user.user_id !== req.body.user_id){
            return res.status(404).json({
                message: 'Can not delete this post!',
            })
        }
        models.Post.destroy({ where: { id: req.params.id } })
        return res.status(200).json({
            message: 'Delete post successfully!',
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong !',
            error: error,
        })
    }
};
module.exports = {
    getAllPosts: index,
    getPostsById: showById,
    getPostsByStatus: showByStatus,
    getPostsByUserId: showByUserId,
    createPost: create,
    updatePostById: update,
    deletePostById: destroy,
    approvePost: approvePost,
}
