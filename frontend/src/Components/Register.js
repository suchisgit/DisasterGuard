import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import './Register.css'; // Import CSS for styling

function Register() {
    const { role, setrole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [emergencyName, setEmergencyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [emergencyPhoneNumberError, setEmergencyPhoneNumberError] = useState('');
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

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        
        if (id === "emergencyName") {
            setEmergencyName(value);
        }
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
        if (id === "emergencyPhoneNumber") {
            // Validate phone number
            if (/^\d{0,10}$/.test(value)) {
                setEmergencyPhoneNumber(value);
                if (value.length !== 10) {
                    setEmergencyPhoneNumberError('Phone number must be 10 digits');
                } else {
                    setEmergencyPhoneNumberError('');
                }
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var user_details = {name: name, email: email, password: password, phoneNumber: phoneNumber }
        try {
            const response = await axios.post(API +'addUser', user_details);
            setName("");
            setEmail("");
            setPassword("");
            setPhoneNumber("");
            setEmergencyName("");
            setEmergencyPhoneNumber("");
            alert("Registration successful, please login to access the website");
            navigate('/login');
        } catch (error) {
            console.error('Registration failed!', error.response.data);
        }
    };

    return (

        <div className="register-container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-6">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaUser /></span>
                                        <input type="text" id="name" value={name} onChange={handleInputChange} className="form-control input" placeholder="Full Name" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaEnvelope /></span>
                                        <input type="email" id="email" value={email} onChange={handleInputChange} className="form-control input" placeholder="Email address" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaLock /></span>
                                        <input type="password" id="password" value={password} onChange={handleInputChange} className="form-control input" placeholder="Password" required />
                                    </div>
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaPhone /></span>
                                        <input type="text" id="phoneNumber" value={phoneNumber} onChange={handleInputChange} className="form-control input" placeholder="Phone Number" required />
                                    </div>
                                    {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaUser /></span>
                                        <input type="text" id="emergencyName" value={emergencyName} onChange={handleInputChange} className="form-control input" placeholder="Emergency Contact Name" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text icon"><FaPhone /></span>
                                        <input type="text" id="emergencyPhoneNumber" value={emergencyPhoneNumber} onChange={handleInputChange} className="form-control input" placeholder="Emergency Contact Phone Number" required />
                                    </div>
                                    {emergencyPhoneNumberError && <div className="text-danger">{emergencyPhoneNumberError}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
