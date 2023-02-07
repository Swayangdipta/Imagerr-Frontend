import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const addAssetToUserCollection = (userId,token,imageId) => {
    return axios.put(`${backend}/user/collection/${userId}`,{_id: imageId},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const getUser = (id ,token)=> {
    return axios.get(`${backend}/user/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}