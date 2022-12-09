const models = require(process.cwd() + '/models/index')

async function index() {
    return models.Rate.findAll()
}

async function showByStoreId(store_id) {
    return models.Rate.findAll({ where: { store_id: store_id } })
}

async function showByStoreIdAndUserId(store_id, user_id) {
    return models.Rate.findOne({ where: { store_id: store_id, user_id: user_id } })
}

async function create(newRate) {
    return models.Rate.create(newRate)
}

async function update(updateRate, id) {
    return models.Rate.update(updateRate, { where: { id: id } })
}


module.exports = {
    getAllRate: index,
    getRateByStore: showByStoreId,
    getRateByStoreIdAndUserId: showByStoreIdAndUserId,
    createRate: create,
    updateRateById: update,
}

