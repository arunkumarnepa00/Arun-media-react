import { useEffect, useRef } from "react";
import { isAuthenticated } from "../auth/apihelper/authcalls";
import { getMessages } from "./apihelper/messengercalls";
import { useState } from "react";
import { format } from 'timeago.js';
import { useSelector,useDispatch } from "react-redux";
import { setNewMsg } from "../redux/newMsgSlice";


const Message = ({ friendId, convoId }) => {

    const { user, token } = isAuthenticated();

    //socket
    const dispatch=useDispatch();
    const socket=useSelector(state=>state.socket.value)

    const scrollRef = useRef();
    const [messages, setMessages] = useState([])
    
    const sentMsg = useSelector(state => state.sentMsg.msg)
    const sender = useSelector(state => state.sentMsg.sender)
    //console.log(sentMsg,sender);
    const newMsg = useSelector(state => state.newMsg.msg)
    const receiver = useSelector(state => state.newMsg.receiver)
    const newMsgSender=useSelector(state=> state.newMsg.sender)   
    //console.log(newMsg,newMsgSender,receiver);

    useEffect(() => {
        const getmsgs = async () => {
            try {
                const data = await getMessages(user._id, token, convoId)
                if (data.err) { console.log(data.err) }
                else { setMessages(data) }
            } catch (error) {
                console.log(error)
            }
        }
        getmsgs()
       
    }, [])

    useEffect(() => {
        if (sender === user._id && messages) {
            if (messages.length>0) {
                setMessages([...messages, { senderId: sender, text: sentMsg, createdAt: Date.now() }])
            }
            else {
                setMessages([{ senderId: sender, text: sentMsg, createdAt: Date.now() }])
            }
        }
        if (receiver === user._id && messages) {
            if (messages.length > 0) {
                setMessages([...messages, { senderId: newMsgSender, text: newMsg, createdAt: Date.now() }])
            }
            else {
                setMessages([{ senderId: newMsgSender, text: newMsg, createdAt: Date.now() }])
            }
        }
    }, [sentMsg,newMsg])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])



    return (

        <div >
            {messages.length > 0 && messages.map((item) => {
                return (
                    <div ref={scrollRef} className={`d-flex  m-1 ${(item.senderId === user._id) ? 'justify-content-end pe-2' : 'ps-2'}`} key={item._id}>
                        <div>
                            <p className={`${(item.senderId === user._id) ? 'bg-primary' : 'bg-light text-dark'} rounded p-1 m-auto text-light`}>{item.text}</p>
                            <p className="" style={{ fontSize: '10px' }}>{format(item.createdAt)}</p>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Message;