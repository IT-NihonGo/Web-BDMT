const RateDAO = require("../CRUD/rate");


const rating = async (req, res) => {
    try {
        console.log("req.params.store_id", req.params.store_id)
        console.log("req.user.user_id", req.user.user_id)
        // If user have rated for this store
        const isRated = await RateDAO.findByStoreIDAndUserID(req.params.store_id, req.user.user_id)
        console.log("isRated", isRated)
        if (isRated) {
            return res.status(409).json({
                message: 'Bạn đã đánh giá cho cửa hàng này!',
            })
        }

        // If user have not rated for this store
        newRate = await RateDAO.create({
            amount: req.body.amount,
            store_id: req.params.store_id,
            user_id: req.user.user_id
        })

        if (newRate) {
            return res.status(200).json({"message": "Bạn đã đánh giá cho cửa hàng " + req.body.amount + " sao!"})
        }



    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong!',
            error: error.toString(),
        })

    }
}

module.exports = {
    rating
}