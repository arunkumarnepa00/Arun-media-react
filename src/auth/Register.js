import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { createUser } from "./apihelper/authcalls";

const Register = () => {

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password:'',
        from:'',
        livesIn:'',
        relationship:'',
        dob:'',
        error:'',
        success:false,
        loading:false
    })
    const { userName, email, password,from,livesIn,relationship,dob, error, success,loading } = user;

    const changeHandler = (event) => {
        const field = event.target.id;
        const value = event.target.value;
        setUser({ ...user, [field]: value })
    }

    const submitHandler = async () => {
        try {
            setUser({ ...user, error: false, loading: true })
            const data = await createUser({ userName: userName, email: email, password: password,from:from,livesIn:livesIn,relationship:relationship,dob:dob})
            if (data.err) {
                setUser({ ...user, error: data.err, success:false})
            }
            else {
                setUser({ ...user,loading:false, success:true })
            }

        } catch (err) {
            console.log(err);
        }
    }

    const successHandler = () => {
        return (
            <>
                {success && (
                    <div className="mb-3 pt-2 offset-4 col-4 bg-primary text-center text-light rounded">
                        <p>User sucessfully created</p>
                    </div>
                )}
            </>

        )
    }

    const errorHandler = () => {
        return (
            <>
                {error && (
                    <div className="mb-3 pt-2 offset-4 col-4 bg-danger text-center text-light rounded">
                        <p>{error}</p>
                    </div>
                )}
            </>
        )

    }

    const laodingHandler = () => {

        return (
            <>
              {loading && (
                <div className="mb-2 p-2  offset-4 col-4  text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            )}
            </>
        )
    }

    return (
        <div className="container bg-light h-100  p-sm-5 mt-5 m-sm-5">
            <div className="row  ">
                {successHandler()}
                {errorHandler()}
                {laodingHandler()}
                <div className="col-sm-6 col-12">
                    <div className="p-5">

                        <h2 className="text-primary fw-bolder">ArunMedia</h2>
                        <p>Connect to your friends,neighbours,family
                            and many others in the world through ArunMedia</p>
                    </div>

                </div>
                <div className="col-sm-5 col-12">

                    <div className="card">
                        <form className="p-3 mt-4">
                            <div className="mb-3">
                                {/* <label for="name" class="form-label">Full Name</label> */}
                                <input type="text" onChange={changeHandler} className="form-control" placeholder="UserName" id="userName" value={userName} />

                            </div>
                            <div className="mb-3">
                                {/* <label for="email" class="form-label">Email address</label> */}
                                <input type="email" onChange={changeHandler} className="form-control" placeholder="email" id="email" value={email} />

                            </div>
                            <div className="mb-3">
                                {/* <label for="password" class="form-label">Password</label> */}
                                <input type="password" onChange={changeHandler} className="form-control" placeholder='password' id="password" value={password} />
                            </div>

                            <div className="d-grid gap-4 col-8 mx-auto">
                                <button className="btn btn-primary" type="button" onClick={submitHandler}>SignUp</button>
                                <Link to='/login' className="btn btn-success text-white text-decoration-none">Log into Account</Link>
                            </div>

                        </form>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default Register;