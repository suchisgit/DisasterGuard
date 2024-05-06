import React, { useState, useContext, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import App from '../App';
import configData from '../config.json';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";

const sanJose = { lat: 37.335480, lng: -121.893028 };

function Googlemaps() {
    const { role, setrole } = useContext(AuthContext);
    const [markers, setMarkers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (role == '') {
            navigate('/');
          }
          else if (role == 'user') {
            navigate('/updateuser');
          }
        const fetchData = async () => {
            try {
                const response = await axios.get(API + 'allIncidentLocations');
                setMarkers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const API = configData.API;

    if(!isLoaded){
        return <h1> Map is loading</h1>
    }

    return (
        <div className='full_width_height' >
            <GoogleMap center={sanJose} zoom={15} mapContainerStyle={{width: '100%', height: '100%'}}>
            {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} />
            ))}
            </GoogleMap>
        </div>

    )
}

export default Googlemaps;