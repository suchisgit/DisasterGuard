import React, { useState, useContext, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import App from '../App';
import configData from '../config.json';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";

const sanJose = { lat: 37.335480, lng: -121.893028 };

function Peopleindanger() {

    const { role, setrole } = useContext(AuthContext);
    const { guserEmail, setguserEmail } = useContext(AuthContext);
    const [markers, setMarkers] = useState([]);
    const navigate = useNavigate();
    function getTimeDifference(updatedAt) {
        const updatedAtDate = new Date(updatedAt);
        const currentTime = new Date();

        const timeDifference = currentTime - updatedAtDate; // Difference in milliseconds

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        let timeAgo = '';
        if (days > 0) {
            timeAgo += `${days} ${days > 1 ? 'days' : 'day'} `;
        }
        if (hours > 0) {
            timeAgo += `${hours} ${hours > 1 ? 'hours' : 'hour'} `;
        }
        if (minutes > 0) {
            timeAgo += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
        }

        if (!timeAgo) {
            timeAgo = 'Less than a minute ago';
        }

        return timeAgo;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(API + 'allIncidents');
            setMarkers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (role == '') {
           //navigate('/');
        }
        else if (role == 'user') {
            navigate('/updateuser');
        }
        fetchData();

    }, []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const API = configData.API;

    const handleHelpedClick = async (incidentId, volunteerEmail) => {
        try {
            const requestBody = {
                incidentId: incidentId,
                volunteerEmail: volunteerEmail
            };
            console.log(requestBody);
            const res = await axios.post(API + 'saveThisPerson', requestBody);
            fetchData();
            console.log(res);
        } catch (error) {
            console.error('Error helping person:', error);
        }
    };

    if (!isLoaded) {
        return <h1> Map is loading</h1>
    }

    return (
        <div className='container'>
            <div className='row'>
                <h1 className='center mb-3'>List of people in crisis</h1>
                {isLoaded ? (
                    markers
                        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                        .map((marker, index) => (
                            <div key={index} className='offset-1 col-10 mb-3'>
                                <div className='card shadow'>
                                    <div class="card-header bg-">
                                    {marker.email ? marker.email : "Unregistered User"}
                                    </div>
                                    <GoogleMap center={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} zoom={15} mapContainerStyle={{ width: '100%', height: '300px' }}>
                                        <Marker position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} />
                                    </GoogleMap>
                                    <div className='card-body'>
                                        <h5 className='card-title'> </h5>
                                        <p className='card-text'>{marker.voicemessage}</p>
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-success btn-sm" onClick={() => handleHelpedClick(marker._id, guserEmail)}>I helped this person</button>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between" >
                                        <small>Last updated {getTimeDifference(marker.updatedAt)} ago</small>
                                        {marker.userPhoneNumber && <small class="text-muted">Call here {marker.userPhoneNumber}</small>}
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <h1>Map is loading</h1>
                )}
            </div>
        </div>
    )
}

export default Peopleindanger;