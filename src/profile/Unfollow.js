import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/apihelper/authcalls";
import { getUserDetails,unfollowUser } from "../profile/apihelper/profilecalls";
import {followUser} from '../follow/apihelper/followcalls';

const UnFollow = (props) => {

    const { user, token } = isAuthenticated();
    const userId = props.userId;

    const [details, setDetails] = useState({});
    useEffect(() => {
        let mounted = true; 
        const getDetails = async () => {
            try {
                const data = await getUserDetails(user._id, token)
                if (data.err) { console.log(data.err) }
                else { if(mounted)setDetails(data); }
            } catch (error) {
                console.log(error);
            }
        }
        getDetails();
        return () => mounted = false;
    }, [userId])
    
    //const f=(details.following && details.following.includes(userId))

    const [flag,setFlag]=useState(false)
    const followHandle = async () => {
        try {
         const temp=await followUser(user._id,token,{userId:userId});
         if(temp.err){console.log(temp.err)}
         else{setFlag(true)}

        } catch (error) {
            console.log(error);
        }
    }
    const [flag2,setFlag2]=useState(false)
    const unfollowHandle = async () => {
        try {
            const temp2=await unfollowUser(user._id,token,{userId:userId});
            if(temp2.err){console.log(temp2.err)}
            else{setFlag2(true)}
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="">
                {
                    (details.following && details.following.includes(userId)) ? (
                        <>
                            {/* <button className="btn btn-light btn-sm mx-2">Following</button> */}
                            <button onClick={unfollowHandle} className="btn btn-primary btn-sm mt-2">{flag2?'Follow':'UnFollow'}</button>
                        </>

                    ) : (
                        <button onClick={followHandle} className={flag?'btn btn-light btn-sm':'btn btn-primary btn-sm'}>{flag?'Following':'Follow'}</button>
                    )
                }
            </div>
        </>
    )
}

export default UnFollow;