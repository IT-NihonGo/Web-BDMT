const {getRoleById} = require("../CRUD/role");
const {addNewStore, getListStores, getStoreByID, updateStoreByUserID} = require('../CRUD/store')
const { getRateByStore, getRateByStoreIdAndUserId, createRate, updateRateById } = require('../CRUD/rate')

const role = require('./../../constant/roles')

const index = async (request, response) => {
    try {
        var stores = await getListStores()

        let results = [];
        for (let i = 0; i < stores.length; i++) {
            let listRate = await getRateByStore(stores[i].id)
            let rate_amount = 0
            if(listRate.length > 0){
                rate_amount = parseFloat((listRate.map(item => item.amount).reduce((a, b) => a + b) / listRate.length).toFixed(1))
            }
            results.push({
                id: stores[i].id,
                name: stores[i].name,
                address: stores[i].address,
                rate_amount: rate_amount,
                User: {
                    id: stores[i].User.id,
                    name: stores[i].User.name,
                    email: stores[i].User.email,
                    UserInfo: {
                        avatar: stores[i].User.UserInfo.avatar,
                        phone_number: stores[i].User.UserInfo.phone_number,
                    }
                }
            })
        }

        return response.status(200).json(results)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error.toString(),
        })
    }
}

async function create(request, response) {
    try {
        // check role is existed in db
        const dbRole = await getRoleById(request.user.role_id)
        if (!dbRole) {
            return response.status(409).json({
                message: 'Invalid role!',
            })
        }

        // check role is STORE_OWNER or ADMIN
        if (request.user.role_id === role.REVIEWER) {
            return response.status(409).json({
                message: 'You dont have permission to create store!',
            })
        }

        // create new store
        const newStore = {
            name: request.body.name,
            address: request.body.address,
            user_id: request.user.user_id,
        }
        await addNewStore(newStore)

        return response.status(201).json({
            message: 'Create store successfully!',
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const storeID = request.params.id

        // check if store exists
        const dbStore = await getStoreByID(storeID)
        if (!dbStore) {
            return response.status(404).json({
                message: 'store not found!',
            })
        }

        // check role is STORE_OWNER or ADMIN
        if (request.body.role_id === role.REVIEWER) {
            return response.status(409).json({
                message: 'You dont have permission to update store!',
            })
        }

        // update
        const updateStore = {
            name: request.body.name,
            address: request.body.address,
        }
        await updateStoreByUserID(updateStore)

        return response.status(200).json({
            message: 'Update store information successfully!',
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error.toString(),
        })
    }
}

const ratingStore = async (req, res) => {
    try {
        // If user have rated for this store
        const rate = await getRateByStoreIdAndUserId(req.body.store_id, req.user.user_id)
        const _rate = {
            amount: req.body.amount,
            store_id: req.body.store_id,
            user_id: req.user.user_id
        }
        if (rate) {
            await updateRateById(_rate, rate.id)
            return res.status(200).json({
                message: "Bạn đã đánh giá cho cửa hàng " + req.body.amount + " sao!"
            })
        }

        // // If user have not rated for this store
        await createRate(_rate)
        return res.status(200).json({message: "Bạn đã đánh giá cho cửa hàng " + req.body.amount + " sao!"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong!',
            error: error.toString(),
        })

    }
}

module.exports = {
    getAllStores: index,
    createStore: create,
    updateStoreById: updateById,
    ratingStore: ratingStore,
}
