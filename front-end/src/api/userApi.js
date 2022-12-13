import axiosClient from './axiosClient'

const userApi  = {
    getAll: () => {
        const url = `/api/users/`
        return axiosClient.get(url)
    },
    getUserById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = '/api/users'
        return axiosClient.post(url, credentials)
    },
    updateById: (id, credentials) => {
        const url = `/api/users/${id}`
        return axiosClient.patch(url, credentials)
    },
    
    softDeleteById: (id) => {
        const url = `/api/users/${id}`
        return axiosClient.delete(url)
    },
}

export default userApi 
