import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';

function Activity() {
  const { role, setRole } = useContext(AuthContext);
  const { guserEmail, setguserEmail } = useContext(AuthContext);
  const { guserName, setguserName } = useContext(AuthContext);
  const [guserPassword, setguserPassword] = useState(AuthContext);
  const [guserPhonenumber, setguserPhonenumber] = useState(AuthContext);

  const navigate = useNavigate();
  const API = configData.API;
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(role);
    if (role == '') {
      navigate('/');
    }
    else if (role == 'user') {
      navigate('/updateuser');
    }
    else if (role == 'Volunteer') {
      navigate('/');
    }
    getActivities();
  }, []);

    async function getActivities() {
        try{
                const response = await axios.get(API +'user/'+ guserEmail);
                console.log(response.data);
                setUserDetails(response.data);
        }
        catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    }
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            const { password, value1 } = event.target;
            const { phoneNumber, value2} = event.target;
            setUserDetails(prevDetails => ({
              ...prevDetails,
              [name]: value,
              [password]: value1,
              [phoneNumber]: value2
            }));
          };
        
          const handleEditClick = () => {
            setIsEditing(true);
          };
        
          const handleSaveClick = () => {
            // Send updated user details to the backend
            axios.patch(API+'updateUser', userDetails)
              .then(response => {
                console.log('User details updated successfully');
                setIsEditing(false);
                alert('User details updated successfully'); 
              })
              .catch(error => {
                console.error('Error updating user details:', error);
                alert('Error in updating user details'); 
              });
        };
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Update Your Profile</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  disabled
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="text"
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-control"
                />
              </div>
              {isEditing ? (
                <button type="button" onClick={handleSaveClick} className="btn btn-primary me-2">Save</button>
              ) : (
                <button type="button" onClick={handleEditClick} className="btn btn-primary me-2">Edit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Activity;