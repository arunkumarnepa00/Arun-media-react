import React, { useEffect, useState } from 'react';
import './Left.css';
import { Link } from 'react-router-dom';
import { signoutUser, isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserWithFrnds } from './apihelper/coreCalls';
import { Buffer } from 'buffer';
//import { useSelector,useDispatch } from 'react-redux';
//import { setValue } from '../redux/socketSlice';

const Left = () => {
  
    const [userPData, setUserPData] = useState('');
    //const socket=useSelector(state=>state.socket.value)
    //const dispatch=useDispatch()
    useEffect(() => {
        let mounted = true;
        const { user, token } = isAuthenticated();
        const getDetails = async () => {
            try {
                const data = await getUserWithFrnds(user._id, token);
                if (data.err) { console.log(data.err) }
                else { if(mounted)setUserPData(data); }
            } catch (error) {
                console.log(error);
            }
        }
        getDetails();

        return () => mounted = false;
    }, []);

    return (
        <div>
            <div className='leftContainer col-3'>
                <div className='leftMenu'>
                    <ul className="d-flex flex-column mt-4" style={{ listStyle: 'none' }}>

                        <li className="my-2"><button className='btn'><i className="fas fa-rss-square"><span className="m-2">Feed</span></i></button></li>
                        <li className="my-2">
                            <Link  to='/messenger' className='btn text-dark'><i className="fas fa-comments-alt"><span className="m-2">Chats</span></i></Link></li>
                        <li className="my-2"><button className='btn'><i className="fas fa-film"><span className="m-2">Videos</span></i></button></li>
                        <li className="my-2">
                            <Link to='/followers' className='btn text-dark'><i className="fas fa-users"><span className="m-2">Followers</span></i></Link>
                        </li>
                        <li className="my-2"><button className='btn'><i className="fas fa-bookmark"><span className="m-2">Bookmarks</span></i></button></li>
                        <li className="my-2"><button className='btn'><i className="far fa-question-circle"><span className="m-2">Questions</span></i></button></li>
                        <li className='my-2'><button className='btn'>
                            <Link to='/login' className="fas fa-sign-out-alt text-decoration-none text-dark"><span className='m-2' 
                            onClick={() => {
                                signoutUser()
                            }}>Signout</span></Link>
                        </button></li>


                    </ul>

                </div>
                <hr />
                <div className='LeftFrnds'>
                    <ul className='mt-4' style={{ listStyle: 'none' }}>
                        {/* <li className='my-3'>
                            <img src="https://images.pexels.com/photos/4668509/pexels-photo-4668509.jpeg"
                                width="35" height="35" className="rounded-circle"></img><span className='m-2'>Jane rose</span>

                        </li> */}
                        {userPData && userPData.following.map((item) => {
                            return (
                                <li className='my-3' key={item._id}>
                                    <Link to={`/profile/${item._id}`} className='text-decoration-none text-dark'>
                                        <img src={(item.profilePhoto
                                            ? (`data:${item.profilePhoto.contentType};base64,${Buffer.from(item.profilePhoto.data.data).toString('base64')}`)
                                            : false)
                                            || require('../assets/images/noprofilepic.png')}
                                            width="40" height="40" className="rounded-circle" alt=''></img>
                                        <span className='m-2'>{item.userName}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul >

                </div >

            </div >

        </div>



    )
}
export default Left;