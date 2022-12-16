import Post from './Post';
import Share from './Share';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { fetchPosts } from './apihelper/coreCalls';

const Feed = () => {

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

    useEffect(() => {
        let mounted = true;
        const { user, token } = isAuthenticated();
        const getposts = async () => {
            try {
                const data = await fetchPosts(user._id, token);
                if(data.err){console.log(data.err)}
                else{if(mounted)setPosts(data);}
            } catch (error) { console.log(error); }
        }
        getposts();

        return () => mounted = false;
    }, [temp,temp2])
    // console.log(posts);

    return (
        <div className='mx-3'>
            <div className='mt-4'>
            <Share afterShare={afterShare} />
            </div>
            <div className='mt-3'>
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
                            <Post post={item} afterDelete={afterDelete} key={item._id} />
                        )
                    })
                }
            </div>
        </div>


    )
}

export default Feed;