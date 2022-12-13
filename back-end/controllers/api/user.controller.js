const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper')
const { addNewUserInfo, updateUserInfoByUserId } = require('../CRUD/user_info')
const {
    getListUsers,
    getUserById,
    getUserByEmail,
    addNewUser,
    updateUserById,
    softDeleteUserById,
} = require('../CRUD/user')

const { getRoleById } = require('../CRUD/role')

async function index(request, response) {
    try {
        const queryResult = await getListUsers()

        return response.status(200).json(queryResult)
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            return response.status(200).json(dbUser)
        } else {
            return response.status(404).json({
                message: 'user not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {

        // Check if email already registered
        const dbUser = await getUserByEmail(request.body.email)
        if (dbUser) {
            return response.status(409).json({
                message: 'Email already exists!',
            })
        }

        // Check if role is valid
        const dbRole = await getRoleById(request.body.role_id)
        if (!dbRole) {
            return response.status(409).json({
                message: 'Invalid role!',
            })
        }

        // Create new user
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashHelper.hash(request.body.password),
            role_id: request.body.role_id,
        }

        // Add new user to database
        addNewUser(newUser).then(async (user) => {
            // Create new user info
            const newUserInfo = {
                user_id: user.id,
                gender: request.body.gender,
                birthday: request.body.birthday,
                address: request.body.address,
                phone_number: request.body.phone_number,
                avatar: 'public/images/avatars/user/default-avatar.png',
            }
            await addNewUserInfo(newUserInfo)

            return response.status(201).json({
                message: 'Create user successfully!',
                user,
            })
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
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Update user's name and user's infos
            const updateUser = {
                name: request.body.name,
            }

            const updateUserInfo = {
                gender: request.body.gender,
                birthday: request.body.birthday,
                address: request.body.address,
                phone_number: request.body.phone_number,
            }

            updateUserById(updateUser, dbUser.id)
            updateUserInfoByUserId(updateUserInfo, dbUser.id)

            return response.status(200).json({
                message: 'Update user information successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'user not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function softDeleteById(request, response) {
    try {
        const userId = request.params.id
       
        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Soft delete user
            await softDeleteUserById(dbUser.id)

            return response.status(200).json({
                message: 'Delete user successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'user not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    updateById: updateById,
    softDeleteById: softDeleteById
}
