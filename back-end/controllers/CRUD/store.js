const { Op } = require('sequelize')

const storeModel = require(process.cwd() + "/models/index").Store;
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
            name: { [Op.like]: `%${params.txt_search}%` },
            'name': { [Op.like]: `%${params.txt_search}%` },
            address: { [Op.like]: `%${params.txt_search}%` },
            'address': { [Op.like]: `%${params.txt_search}%` },
        }),
    })

    return storeModel.findAll({
        order: [["createdAt", "DESC"]],
        include: include,
        where: selection,
    });
}

async function findByID(id) {
    return storeModel.findOne({ where: { id: id } });
}

async function findByOwner(user_id, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
            'name': { [Op.like]: `%${params.txt_search}%` },
            address: { [Op.like]: `%${params.txt_search}%` },
            'address': { [Op.like]: `%${params.txt_search}%` },
        }),
        user_id: user_id,
        
    })
    return storeModel.findAll({
        order: [["createdAt", "DESC"]],
        include: include,
        where: selection,
    });
}

async function create(newStore) {
    return storeModel.create(newStore);
}

async function update(updateStore, id) {
    return storeModel.update(updateStore, { where: { id: id } });
}

async function destroy(userId) {
    return storeModel.destroy({ where: { user_id: userId } });
}

module.exports = {
    getListStores: index,
    getListStoresOwner: findByOwner,
    getStoreByID: findByID,
    addNewStore: create,
    updateStoreByUserID: update,
    deleteUserInfoByUserId: destroy,
};
