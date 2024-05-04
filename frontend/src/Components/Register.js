import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';
import "react-phone-input-2/lib/style.css";


function Register() {
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const { guserphonenumber, setguserPhonenumber } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const API = configData.API;

    useEffect(() => {
        if(guserRole == 'User'){
            console.log('logged in as user');
            navigate('/userpage');
        }
        else if(guserRole == 'Volunteer'){
            console.log('logged in as volunteer');
            navigate('/volunteerpage');
        }
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
        }
        if (id === "phoneNumber") {
            setPhonenumber(value);
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
          setPhonenumber("");
          alert("Registration successful, please login to access the website");
          navigate('/login');
        } catch (error) {
          console.error('registeration failed!', error.response.data);
        }
      };

    return (
        <div className='row'>
          <div className='col-6 offset-3'>
            <div>
                {guserRole}
            </div>
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
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPhoneNumber" className="form-label">Phone Number</label>
                <input type="number" max="11" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => handleInputChange(e)} required/>
            </div>
            <div className='center side'>
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
          </div>
        </div>


    )
}

export default Register;