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
    console.log("hi");
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
              })
              .catch(error => {
                console.error('Error updating user details:', error);
              });
        };
  return (
    <div>
      <h2>User Details</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            //onChange={handleInputChange}
            disabled
          />
        </div>
        <div>
          <label>Passsword</label>
          <input
            type="text"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </form>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}

export default Activity;