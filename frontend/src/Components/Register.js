import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';


function Register() {
    const { role, setrole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const API = configData.API;

    useEffect(() => {
        if(role === 'user'){
            console.log('logged in as user');
            navigate('/');
        }
        else if(role === 'volunteer'){
            console.log('logged in as volunteer');
            navigate('/');
        }
    }, []);

    useEffect(() => {
        // Get user's geolocation
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error('Error getting geolocation:', error.message);
            }
        );
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
            // Validate password length
            if (value.length < 4) {
                setPasswordError('Password must be at least 4 characters');
            } else {
                setPasswordError('');
            }
        }
        if (id === "phoneNumber") {
            // Validate phone number
            if (/^\d{0,10}$/.test(value)) {
                setPhoneNumber(value);
                if (value.length !== 10) {
                    setPhoneNumberError('Phone number must be 10 digits');
                } else {
                    setPhoneNumberError('');
                }
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (phoneNumberError || passwordError) return; // Don't submit if there's an error
        var user_details = {
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            latitude: latitude,
            longitude: longitude
        }
        try {
            const response = await axios.post(API +'addUser', user_details);
            setName("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            alert("Registration successful, please login to access the website");
            navigate('/login');
        } catch (error) {
            console.error('Registration failed!', error.response.data);
        }
    };

    return (
        <div className='row'>
            <div className='col-6 offset-3'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                        <input type="text" min="4" className="form-control" id="name" value={name} onChange={(e) => handleInputChange(e)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" min="4" className="form-control" id="email" value={email} onChange={(e) => handleInputChange(e)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" min="4" className="form-control" id="password" value={password} onChange={(e) => handleInputChange(e)} required/>
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => handleInputChange(e)} required/>
                        {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
                    </div>
                    <div className='center side'>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
