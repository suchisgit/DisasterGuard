import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';

function Register() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setuserID] = useState('');
    const API = configData.API;

    useEffect(() => {
        if(guserRole == 'Member'){
            console.log('logged in as member');
            navigate('/activity');
        }
        else if(guserRole == 'admin'){
            console.log('logged in as admin');
            navigate('/enrollusers');
        }
        else if(guserRole == 'Non Member'){
            console.log('logged in as Non-member');
            navigate('/nonmember');
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "userID") {
            setuserID(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var user_details = { userId: userID, name: name, email: email, password: password }
        try {
          const response = await axios.post(API +'addUser', user_details);
          setName("");
          setEmail("");
          setPassword("");
          setuserID("");
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
                <label htmlFor="exampleInputuserID" className="form-label">User ID </label>
                <input type="text" min="4" className="form-control" id="userID" value={userID} onChange={(e) => handleInputChange(e)} required/>
            </div>
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
            <div className='center side'>
            <button type="submit" class="btn btn-success">Submit</button>
            </div>
        </form>
          </div>
        </div>


    )
}

export default Register;