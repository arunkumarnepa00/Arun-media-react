import { API } from '../../backend';

console.log(API);

export const createUser = async (user) => {
    const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    //console.log(data);

    return data;
}

export const loginUser = async (user) => {
    const response = await fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    //console.log(data);

    return data;

}

export const signoutUser = async () => {

    if (typeof window != "undefined") {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userP");
      
        const response = await fetch(`${API}/signout`, {
            method: 'GET'
        })
        const data = await response.json();
        console.log(data);
    }
}



export const authenticate = (data, next) => {
    if (typeof window != "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }

}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}


