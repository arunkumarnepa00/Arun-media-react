
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserWithFrnds } from './apihelper/coreCalls';
import { Buffer } from 'buffer';
import {useSelector} from 'react-redux';

const Right = ({onlineUsers}) => {
    const {user,token}=isAuthenticated();
    // const [userPData,setUserPData]=useState('');

    // useEffect(() => {
    //     const getUserPDetails = async() => {
    //         try {
    //             const data = await getUserWithFrnds(user._id, token);
    //             if (data.err) { console.log(data.err) }
    //             else { setUserPData(data) }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getUserPDetails();
    // }, [])
    
    return (
        <div className='ms-3'>
            <div className="mt-3 d-flex flex-row">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0STyYoayJVOeliRzBs6ksPapq3tXGxngM2g&usqp=CAU'
                    width='50px' height='50px' className="me-2" alt='' />
                <p><b>Varun</b> and <b>3 other friends</b> have their birthday today</p>

            </div>
            <img src='https://images.pexels.com/photos/5872348/pexels-photo-5872348.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
                width='350px' height='250px' className="rounded" alt='' />
            {/* <div className="mt-3">
                <p><b>Online Friends</b></p>
                <ul className='' style={{ listStyle: 'none', listStyleType: 'none' }}>
                    {
                        userPData && onlineUsers && userPData.following.map((item) => {
                            return (
                                <div key={item._id}>                                    
                                   { onlineUsers.some(user => user.userId === item._id) ? 
                                        <li className='my-3 position-relative'>
                                            <img src={(item.profilePhoto
                                                ? (`data:${item.profilePhoto.contentType};base64,${Buffer.from(item.profilePhoto.data.data).toString('base64')}`)
                                                : false)
                                                || require('../assets/images/noprofilepic.png')}
                                                width="35" height="35" className="rounded-circle"></img>
                                            <span class="position-absolute top-0 translate-middle p-1 bg-success rounded-circle"></span>
                                            <span className='m-2'>{item.userName}</span>
                                        </li> : ''
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
            </div> */}

        </div>
    )
}

export default Right;