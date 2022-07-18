import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faUser,
    faLock,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { 
    url, 
    today, 
    auth_img
} from '../../Data'




const Register = () => {
    const [input, setInput] = useState(null)


    const toggleInput = (string) => {
        setInput(string)
    }

    return (
        <div className="auth-container">
            <LeftSide/>
            <RightSide toggleInput={toggleInput} input={input}/>
        </div>
    )
}

export default Register





const LeftSide = () => {
    return (
        <div className="auth-left">
            <img src={auth_img('1.png')} alt="auth-image"/>
        </div>
    )
}



const RightSide = ({toggleInput, input}) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Hello There!</h3>
                <p>Register to shop for prpoducts</p>
            </div>
            <div className="auth-form">
                <div className="form-group">
                    <div className="form-icon"><FontAwesomeIcon className={`icon ${input == 'username' ? 'active' : ''}`}  icon={faUser} /></div>
                    <input type="text" onBlur={() => toggleInput(null)} onFocus={() => toggleInput('username')} placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <div className="form-icon"><FontAwesomeIcon className={`icon ${input == 'email' ? 'active' : ''}`}  icon={faEnvelope} /></div>
                    <input type="email" onBlur={() => toggleInput(null)} onFocus={() => toggleInput('email')}  placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <div className="form-icon"><FontAwesomeIcon className={`icon ${input == 'password' ? 'active' : ''}`}  icon={faLock} /></div>
                    <input type="password" onBlur={() => toggleInput(null)} onFocus={() => toggleInput('password')}  placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="form-icon"><FontAwesomeIcon className={`icon ${input == 'confirm-password' ? 'active' : ''}`}  icon={faLock} /></div>
                    <input type="password" onBlur={() => toggleInput(null)} onFocus={() => toggleInput('confirm-password')}  placeholder="Confirm password" />
                </div>
                <div className="form-button">
                    <button className="register-btn">REGISTER</button>
                    <div className="login-link">
                        Already has account? <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}