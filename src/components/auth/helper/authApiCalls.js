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

export const signUp = data => {
    return axios.post(`${backend}/auth/signup`,data).then(response => response).catch(e=>e)
}

export const signOut = () => {
    return axios.get(`${backend}/auth/signout`).then(response => {
       return removeAuthorization()
    }).catch(e=>e)
}

export const requestForgotPasswordLink = email => {
    return axios.post(`${backend}/auth/password/forgot`,email).then(response => response).catch(e=>e)
}

export const resetPassword = (data,resetToken) => {
    return axios.put(`${backend}/auth/password/reset/${resetToken}`,data)
                .then(response=>{
                    return response
                }).catch(e=>e)
}

export const updateUser = (data,userId,token) => {
    return axios.put(`${backend}/user/${userId}`,data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response).catch(e=>e)
}