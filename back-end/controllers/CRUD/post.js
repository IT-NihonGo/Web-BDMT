const { Op } = require('sequelize')

const postModel = require(process.cwd() + "/models/index").Post;
const models = require(process.cwd() + "/models/index");
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

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

async function index(params) {

    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            title: { [Op.like]: `%${params.txt_search}%` },
            'title': { [Op.like]: `%${params.txt_search}%` },
            content: { [Op.like]: `%${params.txt_search}%` },
            'content': { [Op.like]: `%${params.txt_search}%` },
        }),
    })


    return postModel.findAndCountAll({
        include: include,
        order: [
            ["createdAt", "DESC"],
        ],
        where: selection,
    });
}

async function showByPostId(postId) {
    return postModel.findOne({ where: { id: postId } });
}

async function showByPostStatus(status) {
    if (status === "") {
        return postModel.findAll({
            order: [["createdAt", "DESC"]],
        });
    }
    return postModel.findAll({
        where: { status: status },
        order: [["createdAt", "DESC"]],
    });
}

async function create(newPost) {
    return postModel.create(newPost);
}

async function update(updatePost, postId) {
    return postModel.update(updatePost, { where: { id: postId } });
}

async function destroy(postId) {
    return postModel.destroy({ where: { id: postId } });
}

module.exports = {
    getAllPost: index,
    getPostByPostId: showByPostId,
    addNewPost: create,
    updatePostByPostId: update,
    deletePostByPostId: destroy,
    showByPostStatus: showByPostStatus
};
