import Menu from './Menu';
import Left from './Left';
import Right from './Right';
import Feed from './Feed';


//socket connection
// import { io } from 'socket.io-client';
// import { useDispatch,useSelector } from 'react-redux';
// import { setValue } from '../redux/socketSlice';
// import { useEffect, useState } from 'react';
// import { isAuthenticated } from '../auth/apihelper/authcalls';
// import {setOnlineUsr} from '../redux/onlineUsrSlice';


const Home = () => {

   //socket
//    const { user } = isAuthenticated();
//    const dispatch = useDispatch();
//    const [socket,setSocket]=useState();
//    useEffect(() => {
//        const temp=io('ws://localhost:8001')
//        setSocket(temp)
//        dispatch(setValue(temp))
//    },[])



//    useEffect(()=>{
//        socket && socket.emit("addUser", user._id)
//        socket && socket.on('getUsers',(data)=>{
//            dispatch(setOnlineUsr(data))
//        })
//    },[user])

    //const onlineUsers=useSelector(state=> state.onlineUsr.userArr)
    
    return (
        <div>
            <Menu />
            <div className='row m-auto'>
                <div className='col-3'>
                    <Left />
                </div>
                <div className='col-5'>
                    <Feed />
                </div>
                <div className='col-4'>
                    {/* <Right onlineUsers={onlineUsers} />  */}
                    <Right /> 
                </div>
            </div>


        </div>

    )
}
export default Home;