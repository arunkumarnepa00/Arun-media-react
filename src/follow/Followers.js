import Menu from '../core/Menu';
import Left from '../core/Left';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserWithFrnds } from '../core/apihelper/coreCalls';
import { Buffer } from 'buffer';


const Followers = () => {

    const { user, token } = isAuthenticated();
    const [details, setDetails] = useState();
    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await getUserWithFrnds(user._id, token);
                if (data.err) { console.log(data.err) }
                else { setDetails(data) }
            } catch (error) {
                console.log(error);
            }
        }
        getDetails()
    }, [user._id, token,details])

    return (
        <div>
            <Menu />
            <div className='row m-auto'>
                <div className='col-3'>
                    <Left />
                </div>
                <div className='col-7'>
                    <h4 className='m-2'>People Following You</h4>
                    <div className='my-4 mx-4 d-flex flex-wrap'>
                        {details && details.followers.map((item) => {
                            return (
                                <div key={item._id}className='card p-2  m-2 col-2 text-center'>
                                    <Link to={`/profile/${item._id}`} className='text-decoration-none text-dark'>
                                        <img src={`data:${item.profilePhoto.contentType};base64,${Buffer.from(item.profilePhoto.data.data).toString('base64')}` || require('../assets/images/noprofilepic.png')}
                                            width="50" height="50" className="rounded-circle m-auto" alt='' />
                                        <p>{item.userName}</p>
                                    </Link>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className='col-2'>
                    <div className='mt-4'>
                        <img src='https://images.pexels.com/photos/1114376/pexels-photo-1114376.jpeg'
                            width='200px' height='200px' className='my-2 p-2' alt='ad1'/>
                        <img src='https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg'
                            width='200px' height='200px' className='my-2 p-2' alt='ad2'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Followers;