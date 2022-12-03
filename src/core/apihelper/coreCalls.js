import { API } from "../../backend"
//import { isAuthenticated } from "../../auth/apihelper/authcalls";

//request user with friends details populated
export const getUserWithFrnds=async(userId,token)=>{
    const response=await fetch(`${API}/userp/${userId}`,{
        method:'GET',
        headers:{
         Authorization:`Bearer ${token}`
        }
    })

    const data=await response.json();
    return data;
}


//call for creating post
export const createPost=async (userId,token,post)=>{ 
    const response=await fetch(`${API}/post/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:post
    })
    const data=await response.json();
    return data;
}

//call for fetching all the posts for user home page
export const fetchPosts=async (userId,token)=>{
  const response=await fetch(`${API}/posts/${userId}`,{
      method:'GET',
      headers:{
          Authorization: `Bearer ${token}`
      }
  })
  const data=await response.json();
  return data;
}

//delete post
export const deletePost=async(userId,token,postId)=>{
    const response=await fetch(`${API}/post/delete/${userId}/${postId}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const data=await response.json();
    return data;
}

//like dislike post
export const likedislike=async(userId,token,postId)=>{
   const response=await fetch(`${API}/post/like/${userId}/${postId}`,{
       method:'PUT',
       headers:{
           Accept:'application/json',
           'Content-Type':'application/json',
           Authorization:`Bearer ${token}`
       },
       body:JSON.stringify({})
   })
   const data=await response.json();
   return data;
}

