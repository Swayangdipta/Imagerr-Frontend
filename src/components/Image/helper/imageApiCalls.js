import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const getImages = limit => {
    return axios.get(`${backend}/images?limit=${limit}`).then(response=>response).catch(e=>e)
}

export const searchImages = query => {
    return axios.post(`${backend}/image/search`,{
        query: query
    }).then(response=>response).catch(e=>e)
}

export const getASingleImage = id => {
    return axios.get(`${backend}/image/${id}`).then(response=>response).catch(e=>e)
}

export const uploadImage = (data,userId,token) => {
    return axios.post(`${backend}/image/${userId}`,data,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response=>response).catch(e=>e)
}

export const getImagesByCategory = (categoryId,limit) => {
    return axios.get(`${backend}/category/${categoryId}?limit=${limit}`).then(response=>response).catch(e=>e)
}

export const getCategories = () => {
    return axios.get(`${backend}/category`).then(response=>response).catch(e=>e)
}