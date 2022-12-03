import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';
import { getUserDetails } from '../profile/apihelper/profilecalls';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { Buffer } from 'buffer';
import { createMessages} from './apihelper/messengercalls';
import { useSelector,useDispatch } from 'react-redux';
import {setNewMsg} from '../redux/newMsgSlice';
import {setSentMsg} from '../redux/sendMsgSlice'

const Chat = ({ friendId,convoId}) => {

    const { user, token } = isAuthenticated();
    const [details, setDetails] = useState({});
    const socket=useSelector(state=>state.socket.value)
    const dispatch=useDispatch();
    

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await getUserDetails(friendId, token)
                if (data.err) { console.log(data.err) }
                else { setDetails(data) }
            } catch (error) {
                console.log(error);
            }
        }
        getDetails(); 

    }, [friendId])


    //msg form
    const [text, setText] = useState('')
    const changeHandler = (event) => {
        setText(event.target.value)
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        dispatch(setSentMsg({sender:user._id,text}))
        socket.emit('sendMsg',{userId:user._id,friendId,text})
    
        try {
            const data = await createMessages(user._id, token, { conversationId: convoId, text: text, senderId: user._id });
            if (data.err) { console.log(data.err) }
            setText('')
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(()=>{
        socket && socket.on('getMsg',(data)=>{
            console.log(data);
            const {userId,friendId,text}=data;
            dispatch(setNewMsg({userId,friendId,text}))
        })
    },[])

    return (

        <div className="convoList col-5">
            <div className="position-fixed p-2 col-5 border-bottom" style={{ backgroundColor: 'rgb(237, 237, 237)' }}>
                <Link to={`/profile/${friendId}`} style={{ textDecoration: 'none' }} className='text-dark'>
                    <img src={details.profilePhoto ? `data:${details.profilePhoto.contentType};base64,
                       ${Buffer.from(details.profilePhoto.data.data).toString('base64')}`
                        : require('../assets/images/noprofilepic.png')}
                        width='40px' height='40px' className="rounded-circle" />
                    <span className="m-2">{details.userName}</span>
                </Link>

            </div>
            <div className="mt-5 pt-4 mb-5">
               <Message  friendId={friendId} convoId={convoId}/>
            </div>
            <div className="position-fixed bottom-0 col-5 d-flex justify-content-center 
                        border-top " style={{ backgroundColor: 'rgb(237, 237, 237)' }}>
                <textarea className="w-75 m-2 rounded bg-light" style={{ outline: 'none' }} placeholder="Type message" onChange={changeHandler} value={text}/>
                <span><button className="btn btn-primary btn-sm mt-4" style={{ textDecoration: 'none' }} onClick={submitHandler}>Send</button></span>

            </div>
        </div>


    )
}

export default Chat;