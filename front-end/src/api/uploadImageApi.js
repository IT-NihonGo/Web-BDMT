import axiosClient from './axiosClient'

const uploadImageApi = {
    uploadUserAvatar: (userId, image) => {
        const url = `/api/upload/user/${userId}`
        return axiosClient.post(url, image)
    },
    uploadPostImage: (postId, image) => {
        const url = `/api/upload/post/image/${postId}`
        return axiosClient.post(url, image)
    },
}

export default uploadImageApi
