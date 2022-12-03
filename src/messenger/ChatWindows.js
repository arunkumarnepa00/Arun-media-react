import Menu from "../core/Menu";
import Right from '../core/Right';
import Conversations from "./Conversations";
import './Messenger.css';
import Chat from "./Chat";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/apihelper/authcalls";
import { getConvoId } from './apihelper/messengercalls';
import { useSelector } from 'react-redux';


const ChatWindow = () => {

    const friendId = useParams().friendId;
    const { user, token } = isAuthenticated();
    const [convoId, setConvoId] = useState();

    const socket=useSelector(state=>state.socket.value)
    const onlineUsers=useSelector(state=>state.onlineUsr.userArr)

    
    useEffect(() => {
        const getConvoDetails = async () => {
            try {
                const data = await getConvoId(user._id, token, friendId);
                if (data.err) { console.log(data.err) }
                else { setConvoId(data._id) }
            } catch (error) {
                console.log(error);
            }
        }
    
    }, [user._id, token, friendId])



    return (
        <div style={{ position: 'sticky' }}>
            <Menu />
           
            <div className="row m-auto">
                <div className="col-3">
                    <Conversations />
                </div>
                <div className="col-5 d-flex flex-column">
                    <Chat friendId={friendId} convoId={convoId} />
                </div>
                <div className="col-4">
                    <Right onlineUsers={onlineUsers}/>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;