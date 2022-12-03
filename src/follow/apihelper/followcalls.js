import { API } from "../../backend"

//get users other than the current user follows
export const getUsersToFollow=async (userId,token)=>{
    const response=await fetch(`${API}/users/${userId}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    const data=await response.json();
    return data;
}

//follow user
export const followUser=async(id,token,friend)=>{
    const response=await fetch(`${API}/user/follow/${id}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(friend)
    })
    const data=await response.json();
    return data;
}