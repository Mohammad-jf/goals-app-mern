import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from './../components/Spinner';




const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [formData, setFromData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])



    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const userData = { email, password }
            dispatch(loginUser(userData))
        }

    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1><FaSignInAlt /> Login</h1>
                <p>Login and Start Setting Goals</p>
            </section>


            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="email"
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='please enter your email' />
                    </div>

                    <div className="form-group">
                        <input type="password"
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='please enter your password' />
                    </div>

                    <div className="form-group">
                        <button className='btn btn-block' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>

            </section>
        </>

    )
}

export default Login