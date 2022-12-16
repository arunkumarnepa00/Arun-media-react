import { useState, useEffect } from 'react';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserDetails } from './apihelper/profilecalls';
import { Buffer } from "buffer";

const Dp = (props) => {

    const {token} = isAuthenticated();
    const userId=props.userId;


    const [details, setDetails] = useState('');
    var ppUrl='';
    var cpUrl='';
    if(details.profilePhoto){
        const pp=details.profilePhoto;
        ppUrl=`data:${pp.contentType};base64,${Buffer.from(pp.data.data).toString('base64')}`
    }
    if(details.coverPhoto){

        const cp=details.coverPhoto;
        cpUrl=`data:${cp.contentType};base64,${Buffer.from(cp.data.data).toString('base64')}`
    }
   

    useEffect(() => {
        let mounted = true;
        const getDetails = async () => {
            try {
                const data=await getUserDetails(userId,token);
                if (data.err) { console.log(data.err) }
                else { if(mounted)setDetails(data); }
            } catch (error) {
                console.log(error);
            }
        }
        getDetails();
        
        return () => mounted = false;
    }, [userId,token])

    return (
        <div className='position-relative'>
            <img src={cpUrl || require('../assets/images/nocoverpic.png')}
                width='100%' height='350px' className='shadow' alt='' />
            <div className="position-absolute start-50 translate-middle border border-secondary border-3 rounded-circle">
                <img src={ppUrl || require('../assets/images/noprofilepic.png')}
                    width='180' height='180' className="rounded-circle" alt='' />
            </div>
        </div>
    )
}

export default Dp;