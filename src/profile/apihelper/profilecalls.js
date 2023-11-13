import { API } from "../../backend"

//user timeline
export const getUserTimeline = async (userId, token) => {
    const response = await fetch(`${API}/posts/userTimeline/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}

//update user details
export const updateUser = async (userId, token, form) => {
    const response = await fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: form
    })
    const data = await response.json();
    return data;
}

//get user details
export const getUserDetails = async (userId, token) => {
    const response = await fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    const data = await response.json();
    return data;
}

//unfollow request
export const unfollowUser = async (userId, token, friend) => {
    const response = await fetch(`${API}/user/unfollow/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(friend)
    })
    const data = await response.json();
    return data;
}