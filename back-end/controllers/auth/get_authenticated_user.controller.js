
const { getUserById } = require('../CRUD/user')

async function getAuthenticatedUser(request, response) {
    try {
        const userId = request.user.user_id

        const dbUser = await getUserById(userId)
        if (dbUser) {
            return response.status(200).json(dbUser)
        } else {
            return response.status(404).json({
                message: 'User not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = getAuthenticatedUser
