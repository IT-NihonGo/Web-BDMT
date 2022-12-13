const REVIEWER_ROLE = 1
const STORE_ROLE = 2
const ADMIN_ROLE = 3

async function checkRoleReviewer(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            if (requestRole != REVIEWER_ROLE) {
                return response.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkRoleStore(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            if (requestRole != STORE_ROLE) {
                return response.status(400).json({
                    message: 'Invalid role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkRoleAdmin(request, response, next) {
    try {
        const requestRole = request.user.role_id

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            return response.status(400).json({
                message: 'Invalid role!',
            })
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    checkRoleReviewer: checkRoleReviewer,
    checkRoleStore: checkRoleStore,
    checkRoleAdmin: checkRoleAdmin,
}
