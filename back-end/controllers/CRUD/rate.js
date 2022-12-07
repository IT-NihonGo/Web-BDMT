const rateModel = require(process.cwd() + '/models/index').Rate

const RateDAO = {}

RateDAO.findByStoreIDAndUserID = async (storeID, userID) => {
    return rateModel.findOne({
        where: {
            store_id: storeID,
            user_id: userID
        }
    })
}

RateDAO.create = async (newRate) => {
    return rateModel.create(newRate)
}

module.exports = RateDAO
