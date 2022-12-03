import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserWithFrnds } from '../core/apihelper/coreCalls';
import { createConvoId } from "./apihelper/messengercalls";

const Conversations = () => {
    
    const { user, token } = isAuthenticated();
    const [details, setDetails] = useState();

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await getUserWithFrnds(user._id, token)
                if (data.err) { console.log(data.err) }
                else { setDetails(data) }

            } catch (err) {
                console.log(err);
            }
        }
        getDetails();
    }, [])

    const clickHandler=async(friendId)=>{
          try {
              const data=await createConvoId(user._id,token,friendId)
              if(data.err){console.log(data.err)}
              else{console.log('created new conversation Id/conversation id already exists')}
          } catch (error) {
              console.log(error);
          }
    }
    return (
        <div className="convoList col-3 position-absolute h-100">
            <input type='text' className="border-0 mt-1" style={{ outline: 'none' }} placeholder="search" />
            <hr />
            {details && details.following.map((item) => {
                return (
                    <Link to={`/chatWindow/${item._id}`} style={{ textDecoration: 'none' }} key={item._id} onClick={() => {
                        clickHandler(item._id)
                    }}>
                        <div className="m-2 p-2 " key={item._id}>
                            <img src={item.profilePhoto ? `data:${item.profilePhoto.contentType};base64,
                                            ${Buffer.from(item.profilePhoto.data.data).toString('base64')}`
                                : require('../assets/images/noprofilepic.png')}
                                width='35px' height='35px' className="rounded-circle me-2" />
                            <span className='text-dark '>{item.userName}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Conversations;