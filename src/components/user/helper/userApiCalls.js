import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const addAssetToUserCollection = (userId,token,imageId) => {
    return axios.put(`${backend}/user/collection/${userId}`,{_id: imageId},{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}