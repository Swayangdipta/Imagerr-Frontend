import axios from 'axios'
import { removeAuthorization } from '../../../utils/LS_Helper'

const backend = process.env.REACT_APP_BACKEND

export const signIn = (data) => {
    return axios.post(`${backend}/auth/signin`,data,{
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        }
    }).then(response => response).catch(e=>e)
}

export const signOut = () => {
    return axios.get(`${backend}/auth/signout`).then(response => {
       return removeAuthorization()
    }).catch(e=>e)
}