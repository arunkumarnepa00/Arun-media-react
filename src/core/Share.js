import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { createPost } from './apihelper/coreCalls';
import { getUserDetails } from '../profile/apihelper/profilecalls'
import { Buffer } from 'buffer';

export default function Share(props) {
    const { user, token } = isAuthenticated();


    const [description,setDescrition]=useState('');
    const [postImg,setPostImg]=useState('');
    const [load,setLoad]=useState('')
    console.log(description)
    console.log(postImg);
    
    const previewHandler = async(event) => {
        console.log('inside handler');
        const previewTag=document.getElementById('preview');
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload=()=>{
            console.log('image loaded')
            previewTag.src=reader.result;
            setLoad(reader.result)
        }         
     
    }
    
    
    
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            event.preventDefault();
            if(postImg!==''){
                var formData = new FormData();
                formData.append('postImg',postImg);
                formData.append('description',description);
            
                const data = await createPost(user._id, token, formData);
                if (data.err) {
                    console.log(data.err);
                } else {
                    console.log('post is created');
                    setDescrition('');
                    setPostImg('');
                    setLoad('');
                    props.afterShare(data._id);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    //profile pic loading
    const [details, setDetails] = useState('');
    var img = ''
    if (details.profilePhoto) {
        img = `data:${details.profilePhoto.contentType};base64,${Buffer.from(details.profilePhoto.data.data).toString('base64')}`
    }
    useEffect(() => {
        console.log("useEffect=>profile pic loading")
        let mounted = true;
        const getDetails = async () => {
              try {
                  const data = await getUserDetails(user._id, token)
                  if (data.err) { console.log(data.err) }
                  else { if(mounted)setDetails(data); }
              } catch (error) {
                  console.log(error);
              }
        }
        getDetails();
  
        return () => mounted = false;
    }, [user._id,token]);

  return (
    <div className="card shadow">
        <div className="card-body">
            <div className="row m-auto mb-2">
          
                <div className="col-2">
                    <img src={img || require('../assets/images/noprofilepic.png')}
                    width="40" height="40" className="rounded-circle" alt='' />
                </div>
                <div className="col-10">
                    <input type='text' placeholder='Enter Caption' onChange={(e)=>{
                        setDescrition(e.target.value)
                    }} value={description} className="border-0 w-100" style={{ outline: 'none' }}/>
                </div>
            </div>
            
            {/* <label htmlFor='postImg' className=''>
            Upload ⬆️
            </label> */}
            <input type='file' name='postImg' id='postImg' 
            className=''
            onChange={(e)=>{
                setPostImg(e.target.files[0])
                previewHandler(e)
            }} />
           <div className={load?'btn float-end':'d-none'} onClick={()=>{
                setPostImg('');
                setLoad('');
            }}>x</div>
            
           <img src={load} id='preview' alt='post-preview' 
           onLoad={(e)=>{
            e.target.style.display='flex'
           }}
           onError={(e)=>{
            e.target.style.display='none'
           }}
           width='420px' height='300px'
           />
        
            <hr />
            <form className="d-flex justify-content-evenly flex-wrap mt-2">
                <div className="">
                    {/* <input id='postImg' type='file' onChange={(e)=>{
                    setPostImg(e.target.files[0])
                    previewHandler(e)
                    }}> */}
                    <i className="fas fa-photo-video text-danger"><span className='ms-1 text-dark'>Photo or Video</span></i>

                </div>
                <div className="">
                    <i className="fas fa-map-marker-alt text-success"><span className='ms-1 text-dark'>Location</span></i>
                </div>
                <div className="">
                    <i className="fas fa-tags text-primary"><span className='ms-1 text-dark'>Tags</span></i>
                </div>
                <div className="">
                    <i className="fas fa-smile text-warning"><span className='ms-1 text-dark'>Feeling</span></i>
                </div>
                <div className="">
                    <button type='button' onClick={(e)=>{
                        submitHandler(e)
                    }} className="btn btn-primary btn-sm"><span>Share</span></button>
                </div>
            </form>
        </div>

    </div>
  )
}
