import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';

const FriendCard = (props) => {

    const friend = props.friend;
    
    var img = '';
    if (friend.profilePhoto){
        img = `data:${friend.profilePhoto.contentType};base64,${Buffer.from(friend.profilePhoto.data.data).toString('base64')}`;
    }
    return (
        <div className="mx-2 my-2 ">
            <Link to={`/profile/${friend._id}`} className='text-decoration-none text-dark text-center'>
                <img src={img || require('../assets/images/noprofilepic.png')}
                    width='100px' height='100px' className="shadow" alt='friend'/>
                <p>{friend.userName}</p>
            </Link>

        </div>

    )
}

export default FriendCard;