import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const getImages = limit => {
    return axios.get(`${backend}/images?limit=${limit}`).then(response=>response).catch(e=>e)
}

export const getASingleImage = id => {
    return axios.get(`${backend}/image/${id}`).then(response=>response).catch(e=>e)
}