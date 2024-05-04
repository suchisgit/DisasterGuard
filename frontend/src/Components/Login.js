import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';

function Login() {
    // const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);


    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const API = configData.API;

    useEffect(() => {
        if (guserRole == 'user') {
            console.log('logged in as user');
            navigate('/home');
        }
        else if (guserRole == 'volunteer') {
            console.log('logged in as volunteer');
            navigate('/home');
        }
    }, [guserRole]);

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
            setguserRole(response.data.role);
            setguserEmail(response.data.email);
            setguserName(response.data.name);
            if (guserRole == 'User') {
                console.log('logged in as user');
                navigate('/userpage');
            }
            else if (guserRole == 'Volunteer') {
                console.log('logged in as volunteer');
                navigate('/volunteerpage');
            }
        } catch (error) {
            alert("Incorrect Email or Password");
            setemail('');
            setPassword('');
            console.error('login failed!', error.response.data);
        }
    };

    return (
        <div className='row'>
            <div className='col-6 offset-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email </label>
                        <input type="text"  min="4" className="form-control" id="email" value={email} onChange={(e) => handleInputChange(e)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" min="4" className="form-control" id="password" value={password} onChange={(e) => handleInputChange(e)} required/>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className='center side'>
                                <button type="submit" class="btn btn-success"><i class="fas fa-edit"></i>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login;