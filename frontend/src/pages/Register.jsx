import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

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

        if (password !== password2) {
            toast.error("passwords dont match")
        } else {
            const userData = {
                email,
                name,
                password
            }
            dispatch(registerUser(userData))
        }
    }


    return (
        <>
            <section className='heading'>
                <h1><FaUser /> Register</h1>
                <p>please create an account</p>
            </section>


            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="text"
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='please enter your name' />
                    </div>

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
                        <input type="password"
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='confirm password' />
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

export default Register