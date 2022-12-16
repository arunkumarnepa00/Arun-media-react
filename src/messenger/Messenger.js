import Menu from "../core/Menu";
import Right from "../core/Right";
import Conversations from "./Conversations";

//socket connection
import { useSelector } from 'react-redux';
import { useEffect } from "react";



const Messenger = () => {
  
    const onlineUsers=useSelector(state=>state.onlineUsr.userArr)
    useEffect(()=>{
      
    },[onlineUsers])
    return (
        <div style={{ position: 'sticky' }}>
            <Menu />
            <div className="row m-auto">
                <div className="col-3">
                    <Conversations />
                </div>
                <div className="col-5 d-flex flex-column">

                </div>
                <div className="col-4">
                    <Right onlineUsers={onlineUsers}/>
                </div>
            </div>
        </div>
    )
}

export default Messenger;