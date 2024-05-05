import React, { useState, useContext, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import App from '../App';
import configData from '../config.json';
import axios from 'axios';


const sanJose = { lat: 37.335480, lng: -121.893028 };

function Peopleindanger() {

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get(API + 'allIncidents');
                setMarkers(response.data);
                console.log(response.data);
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
        <div className='container'>
            <div className='row'>
                {isLoaded ? (
                    markers.map((marker, index) => (
                        <div key={index} className='offset-1 col-10 mb-3'>
                            <div className='card'>
                                <GoogleMap center={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} zoom={15} mapContainerStyle={{ width: '100%', height: '200px' }}>
                                    <Marker position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} />
                                </GoogleMap>
                                <div className='card-body'>
                                    <h5 className='card-title'> </h5>
                                    <p className='card-text'>Latitude: {marker.latitude}</p>
                                    <p className='card-text'>Longitude: {marker.longitude}</p>
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