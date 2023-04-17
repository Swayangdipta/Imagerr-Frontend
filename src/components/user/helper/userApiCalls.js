import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const addAssetToUserCollection = (userId,token,imageId) => {
    return axios.put(`${backend}/user/collection/${userId}`,{_id: imageId},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const removeAssetFromCollection = (imageId,userId,token) => {
    return axios.delete(`${backend}/user/collection/${userId}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {_id: imageId}
    }).then(response => response).catch(e=>e)
}

export const getUser = (id ,token)=> {
    return axios.get(`${backend}/user/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const placeOrder = (userId,token,order) => {
    return axios.post(`${backend}/order/${userId}`,order,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const getSingleOrder = (userId,token,orderId) => {
    return axios.post(`${backend}/orders/${userId}/${orderId}`,{},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}