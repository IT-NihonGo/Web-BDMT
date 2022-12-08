const storeModel = require(process.cwd() + '/models/index').Store
const models = require(process.cwd() + "/models/index");

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

async function index() {
    return storeModel.findAll({include: include})
}

async function findByID(id) {
    return storeModel.findOne({ where: { id: id } })
}

async function create(newStore) {
    return storeModel.create(newStore)
}

async function update(updateStore, id) {
    return storeModel.update(updateStore, { where: { id: id } })
}

async function destroy(userId) {
    return storeModel.destroy({ where: { user_id: userId } })
}

module.exports = {
    getListStores: index,
    getStoreByID: findByID,
    addNewStore: create,
    updateStoreByUserID: update,
    deleteUserInfoByUserId: destroy,
}
