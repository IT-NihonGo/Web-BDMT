const LikeDAO = require("../CRUD/like");

const handleLikePost = async (request, response) => {
    try {
        let isLiked = await LikeDAO.findByUserIDAndPostID(request.user.user_id, request.body.post_id)
        if (!isLiked) {
            let newLike = {
                user_id: request.user.user_id,
                post_id: request.body.post_id
            }
            await LikeDAO.create(newLike)
            return response.status(201).json({message: "liked"})
        } else {
            await LikeDAO.destroy(request.user.user_id, request.body.post_id)
            return response.status(201).json({message: "unliked"})
        }

    } catch (err) {
        console.log(err);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }
}

const handleLikeComment = async (request, response) => {
    try {
        let isLiked = await LikeDAO.findByUserIDAndCommentID(request.user.user_id,  request.body.comment_id)
        if (!isLiked) {
            let newLike = {
                user_id: request.user.user_id,
                comment_id: request.body.comment_id
            }
            await LikeDAO.create(newLike)
            return response.status(201).json({message: "liked"})
        } else {
            await LikeDAO.destroy(request.user.user_id,  request.body.comment_id)
            return response.status(201).json({message: "unliked"})
        }

    } catch (err) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: err.toString(),
        })
    }
}

const getLikesOfPosts = async (request, response) => {
    try {
        const likes = await LikeDAO.findByPost()
        return response.status(200).json(likes)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

const getLikesOfComments = async (request, response) => {
    try {
        const likes = await LikeDAO.findByComment()
        return response.status(200).json(likes)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    handleLikePost: handleLikePost,
    getLikesOfPosts: getLikesOfPosts,
    handleLikeComment: handleLikeComment,
    getLikesOfComments: getLikesOfComments
}