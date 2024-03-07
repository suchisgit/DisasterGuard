import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import configData from '../config.json';

const API = configData.API;
const url = API +'futureClass/';


const Schedule = () => {
    const [bookings, setBookings] = useState([]);
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);

    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [scheduleData, setscheduleData] = useState({
        className: "",
        classId: "",
        location: "",
        startTime: "",
        endTime: "",
        instructor: ""
    });

    useEffect(() => {
        if(guserRole == ''){
            navigate('/');
        }
        else if(guserRole == 'admin'){
            navigate('/enrollusers');
        }
        else if(guserRole == 'Non Member'){
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function fetchUsers() {
        try {
            fetch(url + guserID)
                .then((response) => response.json())
                .then((json) => {
                    setBookings(json);
                    console.log(json);
                })
        }

        catch {
            console.error('get members failed');
        }
    }

    useEffect(() => {
            fetchUsers();
    }, []);
    return (
        <div>
            <div class="row center">
                <h1>My class schedule</h1>
                <div className='row'>
                    <table class="table table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>Class Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Instructor Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map(currSchedule => (
                                    <tr>
                                        <td>{currSchedule.className}</td>
                                        <td>{currSchedule.location}</td>
                                        <td>{(new Date(currSchedule.startTime)).toLocaleDateString()}</td>
                                        <td>{(new Date(currSchedule.startTime)).toLocaleTimeString()}</td>
                                        <td>{(new Date(currSchedule.endTime)).toLocaleTimeString()}</td>
                                        <td>{currSchedule.instructor}</td>
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

export default Schedule;