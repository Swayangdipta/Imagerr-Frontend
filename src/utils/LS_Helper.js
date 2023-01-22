export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem("authorization")){
        return JSON.parse(localStorage.getItem("authorization"))
    }else{
        return false
    }
}

export const authenticate = data => {
    if(typeof window !== "undefined"){
        localStorage.setItem("authorization",JSON.stringify(data))
    }
}

export const removeAuthorization = () => {
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem("authorization")){
        localStorage.removeItem("authorization")
        return true
    }else{
        return false
    }
}