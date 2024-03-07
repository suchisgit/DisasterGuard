import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';

function Login() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);


    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [userID, setuserID] = useState('');
    const API = configData.API;

    useEffect(() => {
        if (guserRole == 'Member') {
            console.log('logged in as member');
            navigate('/schedule');
        }
        else if (guserRole == 'admin') {
            console.log('logged in as admin');
            navigate('/enrollusers');
        }
        else if (guserRole == 'Non Member') {
            console.log('logged in as Non-member');
            navigate('/nonmember');
        }
    }, [guserRole]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "userID") {
            setuserID(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var user_details = { userId: userID, password: password }
        try {
            const response = await axios.post(API +'user/validate', user_details);
            console.log('login successful!', response.data);
            setguserID(response.data.userId);
            setguserRole(response.data.role);
            setguserEmail(response.data.email);
            setguserName(response.data.name);
            if (guserRole == 'Member') {
                console.log('logged in as member');
                navigate('/schedule');
            }
            else if (guserRole == 'admin') {
                console.log('logged in as admin');
                navigate('/enrollusers');
            }
            else if (guserRole == 'Non Member') {
                console.log('logged in as Non-member');
                navigate('/nonmember');
            }
        } catch (error) {
            alert("Incorrect User ID or Password");
            setuserID('');
            setPassword('');
            console.error('login failed!', error.response.data);
        }
    };

    return (
        <div className='row'>
            <div className='col-6 offset-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputuserID" className="form-label">User ID </label>
                        <input type="text"  min="4" className="form-control" id="userID" value={userID} onChange={(e) => handleInputChange(e)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
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
                <div>{guserID}</div>
                <div>{guserRole}</div>
                <div>{guserEmail}</div>
                <div>{guserName}</div>
            </div>
        </div>

    )
}

export default Login;