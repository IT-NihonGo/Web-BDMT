import axiosClient from './axiosClient'

const commentApi  = {
    getAllComments: () => {
        const url = `/api/comments`
        return axiosClient.get(url)
    },
    getCommentByPostId: (post_id) => {
        const url = `/api/comments/post/${post_id}`
        return axiosClient.get(url)
    },
    createComment: (credentials) => {
        const url = `/api/comments`
        return axiosClient.post(url, credentials)
    },
}

export default commentApi 
