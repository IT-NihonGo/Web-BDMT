import axiosClient from './axiosClient'

const likeApi  = {
    getLikesOfPosts: () => {
        const url = `/api/likes/post`
        return axiosClient.get(url)
    },
    getLikesOfComments: () => {
        const url = `/api/likes/comment`
        return axiosClient.get(url)
    },
    createLikePost: (credentials) => {
        const url = `/api/likes/post`
        return axiosClient.post(url, credentials)
    },
    createLikeComment: (credentials) => {
        const url = `/api/likes/comment`
        return axiosClient.post(url, credentials)
    },
}

export default likeApi 
