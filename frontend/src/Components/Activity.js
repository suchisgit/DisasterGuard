import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';

function Activity() {
  const { guserID, setguserID } = useContext(AuthContext);
  const { guserRole, setguserRole } = useContext(AuthContext);
  const [classesData, setclassesData] = useState([]);
  const [machineData, setmachineData] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();
  const API = configData.API;

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

  async function getActivities(event) {
    try {
      const data = {
        userId: guserID,
        startDate: new Date(startTime),
        endDate: new Date(endTime),
      };
      if (startTime && endTime) {
        const classes = await axios.post(API + 'activityHoursSpent', data);
        const machine = await axios.post(API + 'machineHoursSpent', data);
        setclassesData(classes.data);
        setmachineData(machine.data);
        console.log(classes.data);
        console.log(machine.data);
      }
      else {
        alert('Please give start and end time');
      }
    } catch (error) {
      console.error('Error fetching data', error.response.data);
    }
  };


  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };


  return (
    <div>
      <div className='row center'>
        <h1>
          Select start/end time and submit to view data
        </h1>
      </div>
      <div>
        <div className="form-group">
          <div className="row">
            <div className='center side'>
              <h5>Start Time:</h5>
              <input class="ip2" style={{ width: '250px' }}
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className='center side'>
              <h5>End Time:</h5>
              <input class="ip2" style={{ width: '250px' }}
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='center side'>
          <button type="submit" className="btn btn-success center" onClick={getActivities}><i class="fas fa-edit"></i>Submit</button>
        </div>
      </div>

      <div className='row center'>
        <h1>Class Activity</h1>
      </div>

      <div className="row">
        <div className='col-10 offset-1'>
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">Activity Name</th>
                <th scope="col">Hours Spent</th>
                <th scope="col">Calories burnt</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {
                classesData.map(classs => (
                  <tr key={classs.activityName}>
                    <td>{classs.activityName}</td>
                    <td>{classs.activityHours}</td>
                    <td>{classs.caloriesBurnt}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className='row center'>
        <h1>Machine Activity</h1>
      </div>

      <div className="row">
        <div className='col-10 offset-1'>
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th scope="col">Machine Name</th>
                <th scope="col">Hours Spent</th>
                <th scope="col">Calories burnt</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {
                machineData.map(machine => (
                  <tr key={machine.activityName}>
                    <td>{machine.machineName}</td>
                    <td>{machine.hoursSpent}</td>
                    <td>{machine.caloriesBurnt}</td>
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

export default Activity;