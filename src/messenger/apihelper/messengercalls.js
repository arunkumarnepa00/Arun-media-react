import { API } from "../../backend";

//create conversation id
export const createConvoId = async (userId, token, friendId) => {
    const response = await fetch(`${API}/messenger/create/conversationId/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({userId,friendId})
    })
    const data = await response.json();
    return data;
}


//get conversation id
export const getConvoId = async (userId, token, friendId) => {
    const response = await fetch(`${API}/messenger/conversationId/${userId}/${friendId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}

//get messages
export const getMessages = async (userId, token, convoId) => {
    const response = await fetch(`${API}/messages/${userId}/${convoId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data;
}

//create messages
export const createMessages = async (userId, token, msgdetails) => {
    const response = await fetch(`${API}/message/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(msgdetails)
    })
    const data = await response.json();
    return data;
}

