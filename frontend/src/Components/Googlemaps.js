import React, { useState, useContext, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import App from '../App';


const sanJose = { lat: 37.335480, lng: -121.893028 };

function Googlemaps() {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if(!isLoaded){
        return <h1> Map is loading</h1>
    }
    return (
        <div className='full_width_height' >
            <GoogleMap center={sanJose} zoom={15} mapContainerStyle={{width: '100%', height: '100%'}}>
            <Marker position={sanJose}/>
            </GoogleMap>
        </div>

    )
}

export default Googlemaps;