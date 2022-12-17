import React,{useState} from "react";
import { Link ,useNavigate} from 'react-router-dom'
import { loginUser,authenticate } from "./apihelper/authcalls";

const Login = () => {

    const navigate=useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
        error: "",
        loading: false
    })
    const { email, password, error, loading } = user;

    const changeHandler = (event) => {
        const field = event.target.id;
        const value = event.target.value;
        setUser({ ...user, [field]: value })
    }


    const submitHandler = async (event) => {
       
        try{
            event.preventDefault();
            setUser({ ...user, error: false, loading: true })
            const data = await loginUser({email: email, password: password })
            if (data.err) {
                setUser({ ...user, error: data.err})
            }
            else {
                authenticate(data, () => {
                    navigate('/home')
                    //TODO: role based login 
                    // if (user && user.role === 1) {
                    //     navigate('/')
                    // } else {
                    //     navigate('/')
                    // }
                })    
            }
        } catch (err) {
            console.log(err);
        }
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

    return (
        <div className="container bg-light h-100 p-5 m-5">
            {errorHandler()}
            {laodingHandler()}
            <div className="row">
                <div className="col-6">
                    <div className="p-5">
                        <h2 className="text-primary fw-bolder">ArunMedia</h2>
                        <p>Connect to your friends,neighbours,family
                            and many others in the world through ArunMedia</p>
                    </div>

                </div>
                <div className="col-5">

                    <div className="card">
                        <form className="p-3 mt-4">
                            <div className="mb-3">
                                {/* <label for="email" class="form-label">Email address</label> */}
                                <input type="email" onChange={changeHandler} className="form-control" placeholder="email" id="email" />
                            </div>
                            <div className="mb-3">
                                {/* <label for="password" class="form-label">Password</label> */}
                                <input type="text" onChange={changeHandler} className="form-control" placeholder='password' id="password" />
                            </div>
                            <div className="d-grid col-8 mx-auto">
                                <button className="btn btn-primary" onClick={submitHandler} type="button">Login</button>
                                {/* <a href='#' className="text-center">Forgot Password?</a> */}
                                <hr />
                                <Link to='/' className="btn btn-success text-white text-decoration-none">Create New Account</Link>
                            </div>

                        </form>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login;