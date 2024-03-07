import logo from './logo.svg';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Activity from './Components/Activity';
import Signupforclass from './Components/Signupforclass';
import FreeTrials from './Components/FreeTrials';
import Enrollusers from './Components/Enrollusers';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthProvider';
import { useState } from 'react';
import Schedule from './Components/Schedule';
import LogHours from './Components/LogHours';
import CheckInOut from './Components/CheckInOut';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
import Nonmember from './Components/Nonmember';
import Hoursspent from './Components/Hoursspent';
import Noofvisitors from './Components/Noofvisitors';

function App() {
  const [guserID, setguserID] = useState('');
  const [guserRole, setguserRole] = useState('');
  const [guserEmail, setguserEmail] = useState('');
  const [guserName, setguserName] = useState('');

  return (
    <AuthContext.Provider value={{guserID, setguserID,guserRole, setguserRole,guserEmail, setguserEmail,guserName, setguserName}}>
    <div className="App">
      <Navigationbar>
      </Navigationbar>
      <div className='container'>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/schedule" element={<Schedule />} />
          <Route exact path="/loghours" element={<LogHours />} />
          <Route exact path="/activity" element={<Activity />} />
          <Route exact path="/signupforclass" element={<Signupforclass />} />

          <Route exact path="/checkinout" element ={<CheckInOut />} />
          <Route exact path="/enrollusers" element={<Enrollusers />} />
          <Route exact path="/freetrials" element={<FreeTrials />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/hoursspent" element={<Hoursspent />} />
          <Route exact path="/noofvisitors" element={<Noofvisitors />} />




          <Route exact path="/nonmember" element={<Nonmember />} />

        </Routes>
      </div>
    </div>
    </AuthContext.Provider>
  );
}

//     <AuthContext.Provider value={{ userId : [userId, setuserId], userRole : [userRole, setuserRole]}}>

export default App;
