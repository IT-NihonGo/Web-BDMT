const hashHelper = require('../../helpers/password-encrypter/hash_helper')
const models = require('../../models/index')

async function register(request, response) {
    try {
        const dbUser = await models.User.findOne({ where: { email: request.body.email } })
        if (dbUser) {
            return response.status(409).json({
                message: 'Email already exists!',
            })
        }
        
        const dbRole = await models.Role.findByPk(request.body.role_id)
        if (!dbRole) {
                return response.status(409).json({
                message: 'Invalid role!',
            })
        }

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashHelper.hash(request.body.password),
            role_id: request.body.role_id,
        }
        
        models.User.create(newUser).then(async (result) => {
            const newUserInfo = {
                user_id: result.id,
                avatar: 'public\images\avatars\default-avatar.png',
            }
            await models.UserInfo.create(newUserInfo)
        })
        return response.status(201).json({
            message: 'Create user successfully!',
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = register
