import axiosClient from './axiosClient'

const auth = {
    login: (credentials) => {
        const url = '/api/auth/login'
        return axiosClient.post(url, credentials)
    },
    register: (credentials) => {
        const url = '/api/auth/register'
        return axiosClient.post(url, credentials)
    },
    getAuthenticatedUser: () => {
        const url = '/api/auth/get-authenticated-user'
        return axiosClient.get(url)
    },
    changePassword: (credentials) => {
        const url = '/api/auth/change-password'
        return axiosClient.post(url, credentials)
    },
}

export default auth
