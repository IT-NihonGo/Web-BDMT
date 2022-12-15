import axiosClient from './axiosClient'

const postApi  = {
    getAll: () => {
        const url = `/api/posts`
        return axiosClient.get(url)
    },
    getListByStatus: (status) => {
        const url = `/api/posts/status/${status}`
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/posts/`
        return axiosClient.post(url,credentials)
    },
    approve: (postId, credentials) => {
        const url = `/api/posts/${postId}/approve`
        return axiosClient.patch(url, credentials)
    },
}

export default postApi 
