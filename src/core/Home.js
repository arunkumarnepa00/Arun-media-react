import Menu from './Menu';
import Left from './Left';
import Right from './Right';
import Feed from './Feed';
import { useState } from 'react';


//socket connection
// import { io } from 'socket.io-client';
// import { useDispatch,useSelector } from 'react-redux';
// import { setValue } from '../redux/socketSlice';
// import { useEffect, useState } from 'react';
// import { isAuthenticated } from '../auth/apihelper/authcalls';
// import {setOnlineUsr} from '../redux/onlineUsrSlice';


const Home = () => {

    const [sm,setSM] = useState(false);


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
        <div className=''>
            <Menu />

            {/* for mobile */}
            <div className='d-inline d-sm-none'>
            <button className={sm?`d-none`:`btn btn-sm btn-secondary text-white m-2`} onClick={(e)=>{
                setSM(true);
                }}>MENU
            </button>
            <button className={sm?`btn btn-sm`:`d-none`} onClick={(e)=>{
                setSM(false);
            }}>X
            </button>
            <div className=''>
            {
                sm && 
                <div className=''>
                    <Left/>
                </div>
            }{
                !sm &&
                <div className='mx-4'>
                 <Feed/>
                </div>
            }
            </div>
            </div>

            {/* for desktop */}
            <div className='d-none d-sm-inline'>
                <div className='row m-auto'> 
                    <div className='col-3 ps-0'>
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

        </div>

    )
}
export default Home;