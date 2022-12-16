import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserDetails } from '../profile/apihelper/profilecalls';
import { Buffer } from 'buffer';

const Menu = () => {

    const { user,token } = isAuthenticated();
    const [details,setDetails]=useState('');
    var img=''
    if(details.profilePhoto){
        img=`data:${details.profilePhoto.contentType};base64,${Buffer.from(details.profilePhoto.data.data).toString('base64')}`
    }

    useEffect(()=>{
        let mounted = true;
        const getDetails=async()=>{
           try {
               const data=await getUserDetails(user._id,token);
               if(data.err){console.log(data.err)}
               else{if(mounted)setDetails(data);}
           } catch (error) {
               console.log(error);
           }
        }
        getDetails();
        return () => mounted = false;
    },[user._id,token]) 

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#383CC1'}}>

                <div className="container-fluid">
                    <Link className="navbar-brand col-2 text-center" to='/home'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQKcm1NObvS7hRmeUB_9CuJ0gOQbnZhPJwWw&usqp=CAU"
                            alt="logo" width="40" height="40" />
                        <span className="text-light fw-bolder">ArunMedia</span>
                    </Link>
                    <form className="d-flex col-6">
                        <input className="form-control me-2" type="search"
                            placeholder="Search for friends, videos and photos" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    <div className="collapse navbar-collapse col-2 ms-4">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/home">HomePage</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to={`/profile/${user._id}`}>Timeline</Link>
                            </li>
                            <li className="nav-item my-2 ms-3">
                                <Link to='/home'>
                                    <i className="fas fa-bell text-light fs-4"></i>
                                </Link>
                            </li>
                            <li className="nav-item my-2 ms-3">
                                <Link to='/find/friends'>
                                    <i className="fas fa-user-plus text-light fs-4"></i>
                                </Link>
                            </li>
                            <li className="nav-item my-2 ms-3">
                                <Link to='/home'
                                // to={`/messenger`}
                                >
                                    <i className="fab fa-facebook-messenger text-light fs-4"></i>
                                </Link>
                            </li>
                            <li className="nav-item ms-4">
                                <Link to={`/profile/${user._id}`}>
                                    <img src={img || require('../assets/images/noprofilepic.png')} alt='profile'
                                        width="35" height="35" className="rounded-circle"></img>
                                </Link>

                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Menu;