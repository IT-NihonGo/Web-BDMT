const likeModel = require(process.cwd() + '/models/index').Like
const models = require(process.cwd() + "/models/index");

const LikeDAO = {}

const include = [
    {
        model: models.User,
        attributes: {
            exclude: ["password", "updatedAt", "createdAt", "deletedAt"],
        },
        as: "User",
        required: true,
    },
];

LikeDAO.index = async (postID) => {
    return likeModel.findAndCountAll({ where: { post_id: postID } })
}

LikeDAO.findByUserIDAndPostID = async (userID, postID) => {
    return likeModel.findOne(
        {
            where: {
                user_id: userID,
                post_id: postID
            }
        }
    )
}

LikeDAO.findByUserIDAndCommentID = async (userID, commentID) => {
    return likeModel.findOne(
        {
            where: {
                user_id: userID,
                comment_id: commentID
            }
        }
    )
}

LikeDAO.findByComment = async () => {
    return likeModel.findAll({ include: include, where: { post_id: null } })
}

LikeDAO.findByPost = async () => {
    return likeModel.findAll({ include: include, where: { comment_id: null } })
}

LikeDAO.create = async (newLike) => {
    return likeModel.create(newLike)
}

LikeDAO.destroy = async (userID, postID) => {
    return likeModel.destroy(
        {
            where: {
                user_id: userID,
                post_id: postID
            }
        }
    )
}

module.exports = LikeDAO
