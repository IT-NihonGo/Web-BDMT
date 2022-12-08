import axiosClient from './axiosClient'

const storeApi  = {
    getAll: () => {
        const url = `/api/stores`
        return axiosClient.get(url)
    },
    // createNew: (credentials) => {
    //     const url = `/api/posts/`
    //     return axiosClient.post(url,credentials)
    // },
}

export default storeApi 
