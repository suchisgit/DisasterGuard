import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import configData from '../config.json';
import { useNavigate } from "react-router-dom";
import './Volunteer.css'; // Import the CSS file for styling

const API = configData.API;

const Volunteer = () => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { role, setrole } = useContext(AuthContext);
  const { guserEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const style = {textAlign:'center'

  }

  useEffect(() => {
    setIsSubmitDisabled(!(isVolunteer && isChecked));
  }, [isVolunteer, isChecked]);

  const handleToggleChange = () => {
    setIsVolunteer(prevState => !prevState);
  };

  const handleCheckboxChange = () => {
    setIsChecked(prevState => !prevState);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (isSubmitDisabled) {
      alert('Please accept the terms and conditions and register as a volunteer before submitting.');
    } else {
      try {
        const response = await fetch(API + 'user/updateUserMembership/', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: guserEmail })
        });

        if (!response.ok) {
          throw new Error('Failed to update user record');
        }
        setrole("volunteer");
        window.alert('Registration successful as Volunteer!');
        navigate('/');
      } catch (error) {
        console.error('Error updating user record:', error.message);
        throw error;
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card volunteer-card">
            <div className="card-header">
              <h2 className="card-title" style={style}> Volunteer Sign Up</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="volunteer-form">
                <div className="terms-and-conditions">
                  <TermsAndConditions />
                </div>
                <div className="volunteer-checkbox form-check form-switch" >
                  <label htmlFor="volunteerToggle"  class="form-check-label">Register as Volunteer</label>
                  <input className='form-check-input green-switch'
                    type="checkbox"
                    id="volunteerToggle"
                    checked={isVolunteer}
                    onChange={handleToggleChange}
                  />
                </div>
                <div className="volunteer-checkbox form-check form-switch">
                  <label htmlFor="termsCheckbox" class="form-check-label">I accept the Terms and Conditions</label>
                  <input className='form-check-input green-switch'
                    type="checkbox"
                    id="termsCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <button type="submit" disabled={isSubmitDisabled} className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TermsAndConditions = () => (
  <div className="terms-and-conditions">
    <h3>Terms and Conditions</h3>
    <p>
      These terms and conditions ("Terms") govern your use of our application ("the Application")
      and constitute a legally binding agreement between you and [Company Name] ("we," "us," or "our").
      By accessing or using the Application, you agree to be bound by these Terms. If you do not agree
      with any part of these Terms, you may not use the Application.
    </p>
    <p>Notification of Nearby Users in Danger:
      By using the Application, you consent to receive notifications via email or other communication channels when a nearby user is in danger.
      You understand and agree that these notifications will include the location and details of the user in distress.
      You agree to maintain the confidentiality of the information received and use it solely for the purpose of assisting the user in distress or alerting relevant authorities.</p>
    <p>Safety Measures and Procedures:

      You acknowledge the importance of safety and agree to familiarize yourself with the safety measures and procedures provided within the Application.
      You understand that these safety measures and procedures are provided as general guidelines and may not cover all possible scenarios.
      You agree to exercise caution and judgment in any situation where safety is a concern.</p>
    <p>Assistance to Users in Distress:

      You agree to offer assistance to nearby users in distress to the best of your ability and within your means.
      You understand that your assistance should be provided in a safe and responsible manner, taking into account your own safety and well-being.
      You acknowledge that you are not obligated to provide assistance if doing so would put you or others at risk.</p>
    <p>Reporting Safety Concerns:

      You agree to report any safety concerns, including suspicious or unsafe behavior, to the appropriate authorities or within the Application's reporting system.
      You understand that false reporting or misuse of the reporting system may result in the suspension or termination of your account.</p>
    <p>Limitation of Liability:

      You acknowledge and agree that the Application and its developers are not liable for any actions taken or not taken based on the information provided through notifications or safety measures.
      You agree to indemnify and hold harmless the Application and its developers from any claims, damages, or liabilities arising from your use of the Application or participation in any assistance activities.</p>
    <p>Modification of Terms:

      We reserve the right to modify or update these Terms at any time without prior notice.
      You agree to review the Terms periodically and continue to abide by them as long as you use the Application.
      By accepting these Terms, you confirm that you have read, understood, and agreed to all provisions outlined herein. If you do not agree with any part of these Terms, you should refrain from using the Application.</p>
  </div>
);

export default Volunteer;
