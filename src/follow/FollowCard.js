import { Buffer } from 'buffer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../auth/apihelper/authcalls'
import { followUser } from './apihelper/followcalls';

const FollowCard = (props) => {
    
    const {user,token}=isAuthenticated();

    const [flag,setFlag]=useState(false);

    const friend = props.u;
    var img = ''
    if (friend.profilePhoto) {
        img = (`data:${friend.profilePhoto.contentType};base64,
        ${Buffer.from(friend.profilePhoto.data.data).toString('base64')}`)
    }
    
    const submitHandler=async ()=>{
        try {
           const data=await followUser(user._id,token,{userId:friend._id})
           if(data.err){
               console.log(data.err)
            }
           else{setFlag(true)}
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='card p-2 m-2 col-sm-2 text-center'>
            <Link to={`/profile/${friend._id}`} className='text-decoration-none text-dark'>
                <img src={img || require('../assets/images/noprofilepic.png')}
                    width="50" height="50" className="rounded-circle m-auto" alt='' />
                <p>{friend.userName}</p>
            </Link>

            <button onClick={submitHandler} className={flag?'btn btn-light btn-sm':'btn btn-primary btn-sm'}>{flag?'Following':'Follow'}</button>
        </div>

    )
}
export default FollowCard;