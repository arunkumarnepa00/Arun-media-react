
import { useEffect, useState } from "react";
import { isAuthenticated } from '../auth/apihelper/authcalls';
import { getUserDetails, updateUser } from "./apihelper/profilecalls";

const UserInfo = (props) => {
    
    //logged in user and his token
    const { user, token } = isAuthenticated();
    const userId = props.userId;//profile userid

    //for editing profile data
    const [details, setDetails] = useState({});

    //preload
    useEffect(() => {
        let mounted = true;
        const preload = async () => {
            try {
                const temp = await getUserDetails(userId, token);
                if(temp.err){console.log(temp.err)}
                else{if(mounted)setDetails(temp);}
            } catch (error) {
                console.log(error);
            }
        }
        preload();

        return () => mounted = false;
    }, [userId,token])


    //setDataToEdit(user);
    const handleChange = (event) => {
        const fieldName = event.target.id;
        if (fieldName === 'profilePhoto' || fieldName === 'coverPhoto') {
            const pic = event.target.files[0];
            setDetails({ ...details, [fieldName]: pic })
        } else {
            const fieldValue = event.target.value;
            setDetails({ ...details, [fieldName]: fieldValue })
        }
    }
    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            var formData = new FormData();
            for (var key in details) {
                formData.set(key, details[key]);
            }
            const data = await updateUser(user._id, token, formData);
            if (data.err) {
                console.log(data.err);
            } else {
                console.log('user details are updated');
                const temp1 = await getUserDetails(user._id, token);
                if(temp1.err){console.log(temp1.err)}
                else{
                    setDetails(temp1);
                    props.afterEditInfo(temp1);
                }
            }
            //window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            <ul className="" style={{ listStyle: 'none', display: 'inline' }}>
                <li><b>User Information</b></li>
                <li>Name: {details.userName} </li>
                <li>Email: {details.email}</li>
                <li>From: {details.from}</li>
                <li>Lives In: {details.livesIn}</li>
                <li>Relationship: {details.relationship}</li>
                <li>Dob: {details.dob}</li>

            </ul>
            {user._id === userId ?
            <div>
                <p className="mt-2">
                    <button className="btn btn-primary btn-sm" type="button"
                        data-bs-toggle="collapse" data-bs-target="#profileEditForm"
                        aria-expanded="false" aria-controls="profileEditForm">
                        Edit Info
                    </button>

                </p>
                <div className="collapse" id="profileEditForm">
                    <div className="card card-body">
                        <form>
                            <label htmlFor='profilePhoto' className="m-1">Profile Picture<i className="fas fa-upload"></i></label>
                            <input type='file' onChange={handleChange} className="m-2 d-none form-control" id="profilePhoto" />
                            <label htmlFor='coverPhoto' className="m-1">Cover Picture<i className="fas fa-upload"></i></label>
                            <input type='file' onChange={handleChange} className="m-2 d-none form-control" id="coverPhoto" />
                            <input type='text' onChange={handleChange} className="m-2 form-control" id='userName' placeholder="userName" />
                            {/* <input type='text' onChange={handleChange} className="m-2 form-control" id="email" placeholder="Email" /> */}
                            <input type='text' onChange={handleChange} className="m-2 form-control" id='from' placeholder="From" />
                            <input type='text' onChange={handleChange} className="m-2 form-control" id='livesIn' placeholder="LivesIn" />
                            <input type='text' onChange={handleChange} className="m-2 form-control" id='relationship' placeholder="Relationship Status" />
                            <input type='text' onChange={handleChange} className="m-2 form-control" id='dob' placeholder="Date of Birth" />
                            <button onClick={submitHandler} className="m-2 btn btn-primary btn-sm col-5">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
            :''}


        </div>
    )
}

export default UserInfo;