import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import configData from '../config.json';


function Noofvisitors() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const [barData, setBarData] = useState();
    const [total, setTotal] = useState(0);
    const [weekday, setweekday] = useState();
    const [date, setDate] = useState('');
    const API = configData.API;


    const navigate = useNavigate();

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

    async function getHours() {
        try {
            const temp = new Date(date);
            temp.setHours(temp.getHours()+8);
            const obj = {
                date: temp,
                location: selectedLocation
            };
            if(!date && selectedLocation=='Select a location'){
                alert("Please select date and location.");
                return;
            }
            else if(!date){
                alert("Please select date.");
                return;
            }
            else if(selectedLocation == 'Select a location'){
                alert("Please select location");
                return;
            }
            const response = await axios.post(API + 'analytics/visitorsPerHours', obj);
            const hourData = response.data.slice(0, 24);
            setweekday(response.data[24]);
            setTotal(hourData.reduce((t, c) => t + c));
            setBarData(
                {
                    labels: ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6", "Hour 7", "Hour 8", "Hour 9", "Hour 10", "Hour 11", "Hour 12", "Hour 13", "Hour 14", "Hour 15", "Hour 16", "Hour 17", "Hour 18", "Hour 19", "Hour 20", "Hour 21", "Hour 22", "Hour 23", "Hour 24"],
                    datasets: [
                        {
                            label: 'Hours spent',
                            data: hourData,
                            backgroundColor: 'rgba(176, 224, 230, 1)',
                            borderColor: 'black',
                            borderWidth: 1,
                        }
                    ]
                }
            );

        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
        }
    }
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const submit = (e) => {
        getHours();
    }

    return (
        <div>
            <div className='row center'>
                <h1>
                    No of visitors
                </h1>
            </div>
            <div className='row'>
                <div className='freetrial'>
                    <h3>
                        Date
                    </h3>
                    <input type="date" class ="ip2" value={date} onChange={handleDateChange}/>
                    <div className='center side'>
                        <h3>Location</h3>
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
                    <div>
                        <button type="button" class="btn btn-success" onClick={submit}>Get data</button>
                    </div>
                </div>

            </div>
            {
                ((date != '') && (selectedLocation != 'Select a location' ) ? (<div className='row center'>
                <h1>
                    Selected day is {(weekday ? ('Weekday') : ('Weekend'))}
                </h1>
            </div>) : (<div className='row center'>
                <h1>
                    Please select date, location and submit to view data
                </h1>
            </div>) )
            }
            
            <div className='row'>
                <div>
                    {
                        (total != 0 ?
                            <Bar data={barData} options={options}></Bar> : <h3 className='center'>No of visitors is 0 for the selected location and date</h3>)
                    }
                </div>
            </div>

        </div>

    )
}

export default Noofvisitors;