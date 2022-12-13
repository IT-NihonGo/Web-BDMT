const ROLE = require("../../constant/roles");
const STATUS = require("../../constant/status");
const models = require("../../models");

const {
    showByPostStatus
} = require('../CRUD/post')

const approval = async (request, response) => {
    const postID = request.params.id
    const role = request.user.role_id
    const status = request.body.status

    // Check permission
    if (role !== ROLE.ADMIN) {
        return response.status(400).json({
            message: 'you have not permission!'
        })
    }

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
        return response.status(200).json({
            message: 'Post approval successfully!',
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong !',
            error: error.toString(),
        })
    }
}

const getPostsByStatus = async (request, response) => {
    const role = request.user.role_id
    const status = request.params.status

    // Check permission
    if (role !== ROLE.ADMIN) {
        return response.status(400).json({
            message: 'you have not permission!'
        })
    }

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

module.exports = {
    approval: approval,
    getPostsByStatus: getPostsByStatus
}