const commentModel = require(process.cwd() + "/models/index").Comment;
const models = require(process.cwd() + "/models/index");

const CommentDAO = {};

const include = [
    {
        model: models.User,
        attributes: {
            exclude: ["password", "updatedAt", "createdAt", "deletedAt"],
        },
        include: [
            {
                model: models.UserInfo,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                required: true,
            },
        ],
        as: "User",
        required: true,
    },
];

CommentDAO.index = async () => {
    return commentModel.findAll({
        include: include,
        order: [["createdAt", "DESC"]],
    });
};

CommentDAO.findByID = async (id) => {
    return commentModel.findOne({ where: { id: id } });
};

CommentDAO.findByPostID = async (post_id) => {
    return commentModel.findAll({
        include: include,
        where: { post_id: post_id },
        order: [["createdAt", "DESC"]],
    });
};

CommentDAO.findByParentID = async (parent_id) => {
    return commentModel.findAll({ where: { parent_id: parent_id } });
};

CommentDAO.create = async (newComment) => {
    return commentModel.create(newComment);
};

module.exports = CommentDAO;
