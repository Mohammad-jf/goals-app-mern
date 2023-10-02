import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'





const Register = () => {
    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;


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