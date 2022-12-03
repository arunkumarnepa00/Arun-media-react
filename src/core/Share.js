import { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { createPost } from './apihelper/coreCalls';
import { getUserDetails } from '../profile/apihelper/profilecalls'
import { Buffer } from 'buffer';

const Share = (props) => {
    // console.log(props.afterShare)
    const { user, token } = isAuthenticated();

    
    //profile pic loading
    const [details, setDetails] = useState('');
    var img = ''
    if (details.profilePhoto) {
        img = `data:${details.profilePhoto.contentType};base64,${Buffer.from(details.profilePhoto.data.data).toString('base64')}`
    }
    useEffect(() => {
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
    }, [])

    //form handlers
    const [values, setValues] = useState({
        description: '',
        postImg: ''
    });
    const { description, postImg } = values;

    const changeHandler = (event) => {
        const fieldName = event.target.id;
        if (fieldName === 'postImg') {
            const fieldValue = event.target.files[0];
            setValues({ ...values, [fieldName]: fieldValue });
        } else {
            const fieldValue = event.target.value;
            setValues({ ...values, [fieldName]: fieldValue })
        }
    }

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var formData = new FormData();
            for (var key in values) {
                formData.append(key, values[key]);
            }
            const data = await createPost(user._id, token, formData);
            if (data.err) {
                console.log(data.err);
            } else {
                console.log('post is created');
                setValues({
                    description: '',
                    postImg: ''
                });
                props.afterShare(data._id);
            }

        } catch (err) {
            console.log(err);
        }

    }

    
    return (
        <>
            <div className="card shadow">
                <div className="card-body">
                    <div className="row m-auto">
                        <div className="col-2">
                            <img src={img || require('../assets/images/noprofilepic.png')}
                                width="40" height="40" className="rounded-circle" alt='' />
                        </div>
                        <div className="col-10">
                            <input type='text' placeholder="write anything" onChange={changeHandler} id='description' value={description} className="border-0 w-100" style={{ outline: 'none' }} />
                        </div>

                    </div>
                    <hr />
                    {postImg && (
                        <div className='mb-4 text-center'>
                            <img src={URL.createObjectURL(postImg)} width='420px' height='300px' className='' />
                            <a className='position-absolute text-dark' onClick={()=>{
                                setValues({...values,postImg:null})
                            }}><i className="fas fa-times-circle"></i></a>
                            <hr />
                        </div>
                    )}
                    <form className="d-flex justify-content-evenly mt-2">
                        <label htmlFor='postImg' className="">
                            <input type='file' onChange={changeHandler} id='postImg' className='d-none' />
                            <i className="fas fa-photo-video text-danger"><span className='ms-1 text-dark'>Photo or Video</span></i>
                        </label>
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
                            <button onClick={submitHandler} className="btn btn-primary btn-sm"><span>Share</span></button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Share;