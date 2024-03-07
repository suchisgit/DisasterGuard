import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import configData from '../config.json';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Dashboard() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const [weekData, setweekData] = useState();
    const [total, setTotal] = useState(0);
    const API = configData.API;


    const navigate = useNavigate();

    const data = {
        labels: ['One', 'Two', 'Three'],
        datasets: [
            {
                data: [3,6,9],
                backgroundColor: ['aqua', 'orangered', 'purple']
            }
        ]
    }
    const options ={}
    useEffect(() => {
        if(guserRole == ''){
            navigate('/');
        }
        else if(guserRole == 'member'){
            navigate('/member');
        }
        else if(guserRole == 'Non Member'){
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function getClassEnrollment(location) {
        try {
            const response = await axios.get(API +'analytics/classEnrollment/' + location);
            console.log(response.data);
            setTotal(response.data.sunday + response.data.monday + response.data.tuesday + response.data.wednesday + response.data.thursday + response.data.friday + response.data.saturday)
            setweekData(
                {
                    labels : ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'],
                    datasets: [
                        {
                            data:[response.data.sunday,response.data.monday,response.data.tuesday,response.data.wednesday,response.data.thursday,response.data.friday,response.data.saturday],
                            backgroundColor : ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#009688']
                        }
                    ]
                }
            );
            console.log(weekData);
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
            getClassEnrollment(target.innerText);
        }
    }
    
    return (
        <div >
            <div className='row center'>
                <h1>
                    Class enrollment in the current week
                </h1>
            </div>
            <div className='row'>
                <div className='center side'>
                    <h3>Selected location</h3>
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
                <div className='col-6 offset-3'>
                {
                    (total != 0 ?                
                    <Pie
                        data={weekData}
                        options ={options}
                        className='piechart'
                         >
                         </Pie> : <h3 className='center'>No class enrollments in the current week for the selected location</h3>)
                }
                </div>
                
            </div>
        </div>

    )
}

export default Dashboard;