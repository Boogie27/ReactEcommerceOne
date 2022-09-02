import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams, useNavigate   } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faKey,
    faPen,
    faUser,
    faLock,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url, 
    today, 
    auth_img
} from '../../Data'
import FormAlert from '../alerts/FormAlert'
import AlertDanger from '../alerts/AlertDanger'



const Login = ({fetchWishlistItems, alertMessage, fetchCartItems, setUser, isLoading, setIsLoading}) => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [input, setInput] = useState(null)

    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    

    const loginUser = () => {
        const user = { email: email, password: password }

        // validate input fields
        const validate = validate_input(user)
        if(validate === 'failed') return

        setIsLoading({state: true, text: 'Logging in, Please wait...'})
        Axios.post(url('/api/login-user'), user).then((response) => {
            setAlert('')
            setEmailAlert('')
            setPasswordAlert('')
            const data = response.data

            if(data.validationError){
                setIsLoading({state: false, text: ''})
                validateFromBackend(data.validation)
            }else{
                if(data === false){
                    setIsLoading({state: false, text: ''})
                    return setAlert('*Wrong Email or password!')
                }
                if(data.data === 'success'){
                    setUser(data.user)
                    alertMessage('Login successfully!', 5000,)
                    setIsLoading({state: false, text: ''})
                    Cookies.set('weshopappuser', data.user.token, { expires: 1 })
                    const old_page = Cookies.get('current_url')
                    fetchCartItems(data.user.token)
                    fetchWishlistItems(data.user.token)
                    if(old_page){
                        Cookies.set('current_url', '', { expires: new Date(0) })
                        return navigate(old_page)
                    }
                    return navigate("/")
                }
            }
            setIsLoading({state: false, text: ''})
        })

    }


    const toggleInput = (string) => {
        setInput(string)
    }


    const validate_input = (input) => {
        let failed = false

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.email.length == 0){
            failed = true
            setEmailAlert("*Email field is required")
        } else if(!input.email.match(validRegex)){
            failed = true
            setEmailAlert("*Invalid email address")
        }

        if(input.password.length == 0){
            failed = true
            setPasswordAlert("*Passowrd field is required")
        }else if(input.password.length < 6){
            failed = true
            setPasswordAlert("*Must be minimum of 6 characters")
        }else if(input.password.length > 12){
            failed = true
            setPasswordAlert("*Must be maximum of 12 characters")
        }

        

        if(failed == true){
            return 'failed'
        }else{
            return 'success'
        }
    }


    const validateFromBackend = (error) => {
        setAlert('')
        setEmailAlert('')
        setPasswordAlert('')

        if(error.email){
            setEmailAlert(error.email)
        }
        if(error.password){
            setPasswordAlert(error.password)
        }
    }

    return (
        <div className="auth-container">
            <LeftSide/>
            <RightSide toggleInput={toggleInput} input={input} password={password}
                setPassword={setPassword} email={email} setEmail={setEmail} alert={alert}
                emailAlert={emailAlert}  loginUser={loginUser} passwordAlert={passwordAlert}
            />
        </div>
    )
}

export default Login





const LeftSide = () => {
    return (
        <div className="auth-left">
            <img src={auth_img('2.png')} alt="authPic"/>
        </div>
    )
}









const RightSide = ({
    toggleInput, input, password, setPassword, email, setEmail, 
    emailAlert, passwordAlert, alert, loginUser, isLoading
    }) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Hello There!</h3>
                <p>Login to shop for products</p>
                { alert && <AlertDanger alert={alert}/>}
            </div>
            <div className="auth-form">
                <div className="form-group">
                    { emailAlert && (<FormAlert alert={emailAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'email' ? 'active' : ''}`}  icon={faEnvelope} /></div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('email')}  placeholder="Enter email" />
                    </div> 
                </div>
                <div className="form-group">
                    { passwordAlert && (<FormAlert alert={passwordAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'password' ? 'active' : ''}`}  icon={faKey} /></div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('password')}  placeholder="Enter password" />
                    </div>
                </div>
                <div className="form-button">
                    <button onClick={() => loginUser()} className="register-btn">LOGIN</button>
                    <div className="login-link">
                        Dont have an account? <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}