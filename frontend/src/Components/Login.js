import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';
import { FaEnvelope, FaLock} from 'react-icons/fa';
import './login.css';

function Login() {
    // const { guserID, setguserID } = useContext(AuthContext);
    const { role, setrole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const [guserPassword, setguserPassword] = useState(AuthContext);
    const [guserPhonenumber, setguserPhonenumber] = useState(AuthContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const API = configData.API;

    useEffect(() => {
        if (role == 'user') {
            console.log('logged in as user');
            navigate('/');
        }
        else if (role == 'volunteer') {
            console.log('logged in as volunteer');
            navigate('/');
        }
    }, [role]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setemail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var user_details = { email: email, password: password }
        try {
            const response = await axios.post(API +'user/validate', user_details);
            console.log('login successful!', response.data);
            setrole(response.data.role);
            setguserEmail(response.data.email);
            setguserName(response.data.name);
            setguserPassword(response.data.password);
            setguserPhonenumber(response.data.phoneNumber);
            if (role == 'user') {
                console.log('logged in as user');
                navigate('/');
            }

            else if (role == 'volunteer') {
                console.log('logged in as volunteer');
                navigate('/');

            }
        } catch (error) {
            alert("Incorrect Email or Password");
            setemail('');
            setPassword('');
            console.error('login failed!', error.response.data);
        }
    };

    return (
        <div className='login-container'>
        <div className='login-card'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email"><FaEnvelope /></label>
                    <input type="text" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password"><FaLock /></label>
                    <input type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
);
}
export default Login;