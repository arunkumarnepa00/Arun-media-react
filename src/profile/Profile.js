import Left from "../core/Left";
import Menu from "../core/Menu";
import Post from "../core/Post";
import Share from "../core/Share";
import UserInfo from "./UserInfo";
import Dp from "./Dp";
import UserFriends from "./UserFriends";
import UnFollow from './Unfollow';
import { isAuthenticated } from "../auth/apihelper/authcalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserTimeline } from './apihelper/profilecalls';


const Profile = () => {

    //userid from param
    const param = useParams();

    //token from local storage
    const { user, token } = isAuthenticated();

    //for user timeline posts
    const [posts, setPosts] = useState('');

    //for refreshing feeds when post is deleted or new post is created.
    const [temp,setTemp]=useState('')
    const afterDelete=(id)=>{
         setTemp(id);
     }
    const [temp2,setTemp2]=useState('')
    const afterShare=(id)=>{
         setTemp2(id);
    }
     
    //refresh dp after update
    const [temp3,setTemp3]=useState('')
    const afterEditInfo=(info)=>{
         setTemp3(info);
    }

    //preloading
    useEffect(() => {
        let mounted = true; 
        const fetchPosts = async () => {
            try {
                const data = await getUserTimeline(param.userId, token);
                //console.log(data)
                if (data.err) { console.log(data.err) }
                else { if(mounted)setPosts(data); }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();

        return () => mounted = false;
    }, [param.userId,token,temp,temp2,temp3]
    )

    return (
        <div>
            <Menu />
            <div className='row m-auto'>
                <div className="col-3">
                    <Left />
                </div>

                <div className="col-9">
                    <div className="mb-5">
                        <Dp userId={param.userId} />
                    </div>

                    <div className="row m-auto mt-5 pt-4">
                        <div className="col-7">
                            <div className="mt-5 p-3">
                                {(user._id === param.userId) ? <Share afterShare={afterShare} /> : ''}
                            </div>
                            {/*------- display only current user posts ----*/}
                            <div className="px-3">
                                {
                                    !posts && (
                                    <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>
                                    </div>
                                    )
                                }
                                {posts && posts.map((item) => {
                                    return (
                                        <Post post={item} afterDelete={afterDelete} key={item._id}/>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="col-5">
                            <div className="mt-5 pt-4">
                                {!(user._id === param.userId) ? <UnFollow userId={param.userId} /> : ''}
                            </div>
                            <div className="">
                                <UserInfo userId={param.userId} afterEditInfo={afterEditInfo}/>
                            </div>
                            <hr />
                            <div>
                                <p><b>User Friends</b></p>
                                <div className="">
                                    <UserFriends userId={param.userId} />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )

}

export default Profile;