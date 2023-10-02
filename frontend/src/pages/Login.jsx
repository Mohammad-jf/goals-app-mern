import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'





const Login = () => {
    const [formData, setFromData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;


    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

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