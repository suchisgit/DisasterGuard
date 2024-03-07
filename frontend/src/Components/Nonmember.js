import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";

function Nonmember() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const { guserName, setguserName } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(guserID==''){
            navigate('/login');
        }
    }, [guserID]);
    
    return (
        <div>
            <div className='row center'>
            <h1>
                Only members have full access to our website.
            </h1>
            </div>
            <div className='row center'>
                <p>
                Please visit the homepage to view membership details
                 and take membership to be able to get access to our features like
                 booking classes, viewiing activity etc.
                </p>
            </div>
        </div>

    )
}

export default Nonmember;