import axios from 'axios'

const backend = process.env.REACT_APP_BACKEND

export const getAllUsers = (id,token) => {
    return axios.get(`${backend}/admin/users/${id}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response)
    .catch(e => e)
}

export const getAllImages = (id,token) => {
    return axios.get(`${backend}/admin/products/${id}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response)
    .catch(e => e)
}

export const searchUser = (id,token,query) => {
    return axios.post(`${backend}/admin/search/user/${id}`,{query},{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response)
    .catch(e => e)
}

export const addUserByAdmin = (adminId,token,data) => {
    return axios.post(`${backend}/admin/user/${adminId}`,data,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const updateUserByAdmin = (userId,adminId,token,data) => {
    return axios.put(`${backend}/admin/user/${userId}/${adminId}`,data,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const deleteUserByAdmin = (userId,adminId,token) => {
    return axios.delete(`${backend}/admin/user/${userId}/${adminId}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}

export const deleteProductByAdmin = (productId,userId,adminId,token) => {
    return axios.delete(`${backend}/admin/product/${productId}/${userId}/${adminId}`,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}
