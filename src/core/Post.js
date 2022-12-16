import { useState } from 'react';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { Buffer } from "buffer";
import { deletePost, likedislike } from './apihelper/coreCalls';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const Post = ({post,afterDelete}) => {
     
    const { user, token } = isAuthenticated();

    const [temp4,setTemp4]=useState(false);

    //get post image from image data buffer
    const temp3 = post.postImg;
    const postPicture = `data:${temp3.contentType};base64,${Buffer.from(temp3.data.data).toString('base64')}`

    //get profile pic from image data buffer
    const profilePicture = post.user.profilePhoto ? (`data:${post.user.profilePhoto.contentType};base64,${Buffer.from(post.user.profilePhoto.data.data).toString('base64')}`) : ''

    const handleLike = async() => {
        try {
            const temp2=await likedislike(user._id,token,post._id)
            if(temp2.err){console.log(temp2.err)}
        } catch (error) {
            console.log(error);
        }
    }

    const deleteHandle = async () => {
        try {
            const temp1 = await deletePost(user._id, token, post._id)
            if (temp1.err) { console.log(temp1.err) }
            else {
                afterDelete(`deleted ${post._id}`);
                console.log('post deleted')
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    return (

        <div className="card mb-3 shadow">
            <div className="mt-3 mb-2 mx-2">
                {/* <img src="https://images.pexels.com/photos/4668509/pexels-photo-4668509.jpeg"
                    width="35" height="35" className="rounded-circle" /> */}
                <Link to={`/profile/${post.user._id}`} className='text-dark text-decoration-none'>
                    <img src={profilePicture || require('../assets/images/noprofilepic.png')}
                        width="40" height="40" className="rounded-circle" alt='' />
                    <span className='m-2 font-weight-bold'>{post.user.userName}</span>
                    
                </Link>
                <span style={{fontSize:'12px'}}>...{format(post.createdAt)}</span>
                {(user._id === post.user._id) &&
                    // <>
                    //     <button className='btn position-absolute end-0' data-bs-toggle='collapse' data-bs-target='#updatePost'
                    //         aria-expanded="false" aria-controls="updatePost">
                    //         <i className="fas fa-ellipsis-v "></i></button>
                    //     <div className="collapse position-absolute start-100 top-0" id="updatePost">
                    //         <ul className='' style={{ listStyle: 'none', display: 'inline' }}>
                    //             <li><button onClick={handleLike} className='btn btn-light btn-sm px-4'>Edit</button></li>
                    //             <li><button onClick={deleteHandle} className='btn btn-secondary btn-sm px-3'>Delete</button></li>
                    //         </ul>
                    //     </div>

                    // </>
                    <>
                        <button className='btn position-absolute end-0 outline-none' 
                        onClick={(e)=>{
                            e.preventDefault();
                            setTemp4(!temp4)
                        }}>
                            <i className="fas fa-ellipsis-v "></i>
                        </button>
                        {
                        temp4 && 
                        (<div className="position-absolute start-100 top-0">
                            <ul className='' style={{ listStyle: 'none', display: 'inline' }}>
                                <li><button onClick={handleLike} className='btn btn-light btn-sm px-4'>Edit</button></li>
                                <li><button onClick={deleteHandle} className='btn btn-secondary btn-sm px-3'>Delete</button></li>
                            </ul>
                        </div>)
                        }
                    </>
                }

            </div>
            <p className="mx-2">{post.description}</p>

            <img src={postPicture} alt='post' />
            <div className="mb-2 mt-1 mx-1 d-flex justify-content-between">
                <div className='btn' onClick={handleLike} style={{}}>
                    <i className="fas fa-thumbs-up text-primary"></i>
                    <i className="fas fa-heart-circle text-danger"></i>
                    <span>{post.likes?post.likes.length:'0'}</span>
                </div>
                <div className="btn ms-12">
                    <span>0 comments</span>
                </div>

            </div>

        </div>

    )
}

export default Post;