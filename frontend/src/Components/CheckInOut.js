import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from '../config.json';

const CheckInOut = () => {
  const [userId, setUserId] = useState('Select User');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [icheckInTime, setiCheckInTime] = useState(false);
  const [icheckOutTime, setiCheckOutTime] = useState(false);
  const [users, setUsers] = useState([]);
  const API = configData.API;

  useEffect(() => {
    fetchUsers();
    console.log(API);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API +'user'); // Replace with your API URL
      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };


  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleCheckInTimeChange = (e) => {
    setCheckInTime(e.target.value);
  };

  const handleCheckOutTimeChange = (e) => {
    setCheckOutTime(e.target.value);
  };
  const setValue = (e) => {
    const target = e.target;
    if (target.classList.contains('dropdown-item')) {
      setUserId(target.innerText);
      setCheckInTime('');
      setCheckOutTime('');
      getUserCheckStatus(target.innerText);
    }
  }

  async function getUserCheckStatus(user) {

    try {
      const response = await axios.get(API +'inOrOut/'+ user);
      console.log(response.data);
      if (response.data.check == 'In') {
        setiCheckInTime(false);
        setiCheckOutTime(true);
      }
      else if (response.data.check == 'Out') {
        setiCheckInTime(true);
        setiCheckOutTime(false);
      }
    }
    catch {
      console.error('get members failed');
    }

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the check-in/check-out data
    const checkInOutData = {
      userId: userId,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
    };
    console.log(checkInOutData);
    if ((!userId || userId == 'Select User')) {
      alert("Please select the user");
      return;
    }
    if (icheckInTime == false) {
      const url = API + 'updateCheckIn/' + userId;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log('Response from backend:', data);
          setUserId('Select User')
          setCheckInTime('');
          setCheckOutTime('');
          setiCheckInTime(false);
          setiCheckOutTime(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    else {
      const url = API + 'updateCheckOut/' + userId;
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log('Response from backend:', data);
          setUserId('Select User');
          setCheckInTime('');
          setCheckOutTime('');
          setiCheckOutTime(false);
          setiCheckInTime(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    // Send the check-in/check-out data to the backend

  };

  return (
    <div>
      <div className='row center'>
        <h1>
          Select user and time to submit checkin/checkout
        </h1>
      </div>
      <div className='row'>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">

            <div className='row'>
              <div className='center side'>
                <h5 style={{ paddingRight: '48px' }}> User    </h5>
                <div class="dropdown" onClick={setValue}  >
                  <button class="btn btn-secondary dropdown-toggle" style={{ width: '210px' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {userId}
                  </button>
                  <ul class="dropdown-menu" >
                    {
                      users.map(user => (
                        <li><a class="dropdown-item" >{user.userId}</a></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <div className="form-group">
            <div className="row">
              <div className='center side'>
                <h5 style={{ paddingRight: '15px' }}>Check In</h5>
                <input class="ip2" style={{ width: '250px' }}
                  type="datetime-local"
                  id="startTime"
                  value={checkInTime}
                  onChange={handleCheckInTimeChange}
                  disabled={icheckInTime}
                  required={!icheckInTime}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className='center side'>
                <h5>Check Out</h5>
                <input class="ip2" style={{ width: '250px' }}
                  type="datetime-local"
                  id="endTime"
                  value={checkOutTime}
                  onChange={handleCheckOutTimeChange}
                  disabled={icheckOutTime}
                  required={!icheckOutTime}
                />
              </div>
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <div className="row">
              <div className='center side'>
                <button type="submit" class="btn btn-success"><i class="fas fa-edit"></i>Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>

  );
};

export default CheckInOut;
