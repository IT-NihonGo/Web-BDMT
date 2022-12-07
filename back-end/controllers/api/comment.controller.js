const CommentDAO = require('../CRUD/comment')

const createComment = async (request, response) => {
    try {
        const newComment = {
            user_id: request.user.user_id,
            post_id: request.body.post_id,
            content: request.body.content,
            parent_id: request.body.parent_id,
        }
        await CommentDAO.create(newComment)
        return response.status(201).json({
            message: 'Create comment successfully!',
        })
    } catch (err) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err,
        })
    }
}

const getCommentsByPostID = async (request, response) => {
    try {
        const comments = await CommentDAO.findByPostID(request.params.id)
        return response.status(201).json(comments)
    } catch (err) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err,
        })
    }
}
const getAllComments = async (request, response) => {
    try {
        const comments = await CommentDAO.index()
        return response.status(201).json(comments)
    } catch (err) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err,
        })
    }
}


module.exports = {
    createComment: createComment,
    getAllComments: getAllComments,
    getListCommentsByPostID: getCommentsByPostID,
}

