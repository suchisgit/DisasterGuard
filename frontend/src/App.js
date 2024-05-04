import logo from './logo.svg';
import './App.css';
import Navigationbar from './Components/Navigationbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Googlemaps from './Components/Googlemaps'
import Dashboard from './Components/Dashboard';
import Updateuser from './Components/Updateuser';
import Updateuser from './Components/Updateuser';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthProvider';
import { useState } from 'react';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
import Volunteer from './Components/Volunteer';
import SupportMaterial from './Components/SupportMaterial';

function App() {
 
  const [guserID, setguserID] = useState('');
  const [role, setrole] = useState('');
  const [guserEmail, setguserEmail] = useState('');
  const [guserName, setguserName] = useState('');

  return (
    <AuthContext.Provider value={{guserID, setguserID,role, setrole,guserEmail, setguserEmail,guserName, setguserName}}>
    <div className="App">
      <Navigationbar>
      </Navigationbar>
      <div className='container'>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/maps" element={<Googlemaps />} />
          <Route exact path="/volunteer" element={<Volunteer />} />
          <Route exact path="/updateuser" element={<Updateuser />} />
          <Route exact path="/supportmaterial" element={< SupportMaterial/>} />
          <Route exact path="/updateuser" element={<Updateuser />} />
        </Routes>
      </div>
    </div>
    </AuthContext.Provider>
  );
}

//     <AuthContext.Provider value={{ userId : [userId, setuserId], userRole : [userRole, setuserRole]}}>

export default App;
