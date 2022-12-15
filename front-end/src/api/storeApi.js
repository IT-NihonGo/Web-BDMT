import axiosClient from './axiosClient'

const storeApi  = {
    getListStores: (credentials) => {
        var url = `/api/stores?txt_search=${credentials.txt_search}`
        if(credentials.id){
            url = `/api/stores/owner?txt_search=${credentials.txt_search}`
        }
        return axiosClient.get(url)
    },
    createNew: (credentials) => {
        const url = `/api/stores`
        return axiosClient.post(url,credentials)
    },
    ratingStore: (credentials) => {
        const url = `/api/stores/rate`
        return axiosClient.post(url,credentials)
    },
}

export default storeApi 
