import Menu from '../core/Menu';
import Left from '../core/Left';
import { useEffect, useState } from 'react';
import { getUsersToFollow } from './apihelper/followcalls';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import FollowCard from './FollowCard';

const Follow = () => {

    const { user, token } = isAuthenticated();

    const [details, setDetails] = useState();

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await getUsersToFollow(user._id, token)
                if (data.err) { console.log(data.err) }
                else { setDetails(data) }
            } catch (error) {
                console.log(error)
            }
        }
        getDetails();
    }, [user._id, token])

    return (
        <div>
            <Menu />
            <div className='row m-auto'>
                <div className="col-3">
                    <Left />
                </div>
                <div className='col-7'>
                    <h4 className='m-2'>Find friends and get connected</h4>
                    <div className='my-4 mx-4 d-flex flex-wrap'>
                        {details && details.map((item) => {
                            return (
                                <FollowCard u={item} key={item._id} />
                            )
                        })}
                    </div>
                </div>

                <div className='col-2'>
                     <div className='mt-4'>
                         <img src={require('../assets/images/ad1.jpeg')}
                         //src='https://images.pexels.com/photos/1114376/pexels-photo-1114376.jpeg'
                         width='200px' height='200px' className='my-2 p-2' alt='ad1'/>
                         <img src={require('../assets/images/ad2.jpeg')}
                         //src='https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg' 
                         width='200px' height='200px' className='my-2 p-2' alt='ad2'/>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Follow;