import axios from 'axios'

const backend = process.env.REACT_APP_BACKEND

export const signIn = (data) => {
    return axios.post(`${backend}/auth/signin`,data,{
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        }
    }).then(response => response).catch(e=>e)
}