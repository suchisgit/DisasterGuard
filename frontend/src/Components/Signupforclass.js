import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import configData from '../config.json';

function Signupforclass() {
    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const { guserRole, setguserRole } = useContext(AuthContext);
    const { guserID, setguserID } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [classID, setClassID] = useState('');
    const API = configData.API;

    const navigate = useNavigate();

    useEffect(() => {
        if (guserRole == '') {
            navigate('/');
        }
        else if (guserRole == 'admin') {
            navigate('/enrollusers');
        }
        else if (guserRole == 'Non Member') {
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function getClasses(location) {
        try {
            var req = { userId: guserID, location: location }
            const response = await axios.post(API + 'futureClasses', req);
            setClasses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
            getClasses(target.innerText);
        }
    }
    async function bookClass(clickedClassID) {
        console.log(clickedClassID);
        try {
            var classs = { userId: guserID, classId: clickedClassID }
            const response = await axios.post(API + 'bookClass', classs);
            alert('Class booked successfully');
            getClasses(selectedLocation);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    return (
        <div>
            <div className='row center'>
                <h1>Sign up for our classes</h1>
            </div>
            <div className='row'>
                <div className='center side'>
                    <h3>Seleced location</h3>
                    <div class="dropdown" onClick={setValue}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedLocation}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" >Mountain View</a></li>
                            <li><a class="dropdown-item" >Sunnyvale</a></li>
                            <li><a class="dropdown-item" >Milpitas</a></li>
                            <li><a class="dropdown-item" >San jose</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-10 offset-1'>
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Class</th>
                                <th scope="col">Date</th>
                                <th scope="col">Start Time</th>
                                <th scope="col">End Time</th>
                                <th scope="col">Instructor Name</th>
                                <th scope="col">Book class</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            {
                                classes.map(x => (
                                    <tr >
                                        <td>{x.className}</td>
                                        <td>{(new Date(x.startTime)).toLocaleDateString()}</td>
                                        <td>{(new Date(x.startTime)).toLocaleTimeString()}</td>
                                        <td>{(new Date(x.endTime)).toLocaleTimeString()}</td>
                                        <td>{x.instructor}</td>
                                        <td>
                                            {
                                                (x.booked ?
                                                    <button type="button" class="btn btn-success" onClick={() => bookClass(x.classId)} disabled>Already booked</button> :
                                                    <button type="button" class="btn btn-success" onClick={() => bookClass(x.classId)}>Book</button>
                                                )
                                            }

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>



    )
}

export default Signupforclass;