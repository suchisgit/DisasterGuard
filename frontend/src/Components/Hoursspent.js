import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import configData from '../config.json';

ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement
)
function Hoursspent() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);

    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const [ barData, setBarData ] = useState();
    const [ total, setTotal ] = useState(0);
    const [ lineData, setLineData ] = useState();
    const [ lineTotal, setlineTotal ] = useState(0);
    const API = configData.API;
    


    const navigate = useNavigate();

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const lineOptions = {
        plugins: {
            legend: true
        },
        scales : {
            y : {
                // min : 3,
                // max : 6
            }
        }
    }

    useEffect(() => {
        if (guserRole == '') {
            navigate('/');
        }
        else if (guserRole == 'member') {
            navigate('/member');
        }
        else if (guserRole == 'Non Member') {
            navigate('/nonmember');
        }
    }, [guserRole]);

    async function getHours(location) {
        try {
            const response = await axios.get(API +'analytics/hoursSpentAtGym/' + location);
            console.log(response.data);
            const weekData = response.data.slice(-7).reverse();
            setTotal(weekData.reduce((t,c) => t+c));
            setBarData(
                {
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'day 7'],
                    datasets: [
                        {
                            label: 'Hours spent',
                            data: weekData,
                            backgroundColor: 'rgba(176, 224, 230, 1)',
                            borderColor: 'black',
                            borderWidth: 1,
                        }
                    ]
                }
            );
            const monthData = response.data.slice().reverse();
            setlineTotal(monthData.reduce((t,c) => t+c));
            setLineData(
                {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    datasets: [{
                        label : 'Hours',
                        data : monthData,
                        backgroundColor: 'rgba(176, 224, 230, 1)',
                        borderColor : 'black',
                        pointBorderColor: 'rgba(176, 224, 230, 1)'
                    }]
                }
            )
        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
            getHours(target.innerText);
        }
    }

    return (
        <div>
            <div className='row center'>
                <h1>
                    No of hours spent
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
            <div className='row center'>
                <h1>
                    Last week
                </h1>
            </div>
            <div className='row'>
                <div className='col-6 offset-3'>
                {
                    (total != 0 ?                
                        <Bar data={barData} options={options}></Bar> : <h3 className='center'>No of hours is 0 in the current week for the selected location</h3>)
                }
                </div>
            </div>
            <div className='row center'>
                <h1>
                    Last 30 days
                </h1>
            </div>
            <div className='row'>
                <div className='col-10 offset-1'>
                {
                    (lineTotal != 0 ?                
                        <Line data={lineData} options={options}></Line> : <h3 className='center'>No of hours is 0 in the current week for the selected location</h3>)
                }
                </div>
            </div>

        </div>

    )
}

export default Hoursspent;