import React, { useEffect, useState, useContext } from 'react';
import { FaMicrophone, FaStop, FaRedo, FaPaperPlane } from 'react-icons/fa';
import configData from '../config.json';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Home.css';
import Slider from 'react-slick';
import { AuthContext } from '../context/AuthProvider';

const Statistics = ({ incidentsReported, volunteersSignedUp }) => {
  return (
    <div className="statistics">
      <div className="statistic">
        <h3>{incidentsReported}</h3>
        <p>INCIDENTS REPORTED</p>
      </div>
      <div className="statistic">
        <h3>{volunteersSignedUp}</h3>
        <p>REGISTERED VOLUNTEERS </p>
      </div>
    </div>
  );
};

function Home() {
  const [isContinuous, setIsContinuous] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [script, setScript] = useState('');
  const { guserEmail, setguserEmail } = useContext(AuthContext);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [incidentsReported, setIncidentsReported] = useState(0);
  const [volunteersSignedUp, setVolunteersSignedUp] = useState(0);
  const API = configData.API;
  const navigate = useNavigate();
  


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting geolocation:', error.message);
      }
    );
  }, []);

  useEffect(() => {
    // Fetch statistics
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(API + 'statistics');
        setIncidentsReported(response.data.incidentsReported);
        // Simulate transition effect by delaying the update of volunteersSignedUp
        setTimeout(() => {
          setVolunteersSignedUp(response.data.volunteersSignedUp);
        }, 100); // Adjust delay as needed
      } catch (error) {
        console.error('Error fetching statistics:', error.message);
      }
    };
    fetchStatistics();
  }, []);


  const handleStartListening = () => {
    setIsContinuous(true);
    setIsRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    setIsContinuous(false);
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

 
  const handleSendMessage = async event => {
    if (transcript.trim() === '') {
      alert('Please speak something before sending the message.');
      return;
    }  
    setScript(transcript);
    var user_details = { email: guserEmail, latitude: latitude, longitude: longitude, voiceToTextData: transcript} 
    
      // Handle form submission, e.g., send data to backend
      try {
        const response = await axios.post(API +'isDisaster', user_details);
        if (response.status === 200) {
          window.alert('Successfully sent the message');
          resetTranscript();
        } else {
          throw new Error('Failed to send the message');
        }
      } catch (error) {
        console.error('Error in sending the message', error.message);
        throw error;
      }
      console.log('Form submitted!');
    };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 400000, // Change slide every 2 seconds
  };


  return (
    <div className="background-slide background1">
      <div className="container">
        <div className="header">
          <h1>Immediate Assistance</h1>
        </div>
        <div className="content">
          <div className="message center">
            <p>Are you in danger?</p>
          </div>
          <div className="controls">
            <div className={`icon-container ${isRecording ? 'active' : ''}`}>
              <FaMicrophone
                className="icon"
                onClick={isRecording ? handleStopListening : handleStartListening}
              />
              <p className="control-text">Start Listening</p>
            </div>
            <div className="icon-container">
              <FaStop
                className="icon"
                onClick={handleStopListening}
              />
              <p className="control-text">Stop Listening</p>
            </div>
            <div className="icon-container">
              <FaRedo
                className="icon"
                onClick={resetTranscript}
              />
              <p className="control-text">Reset Transcript</p>
            </div>
            <div className="icon-container">
  <FaPaperPlane
    className={`icon ${transcript.trim() === '' || isRecording ? 'disabled' : ''}`}
    onClick={handleSendMessage}
    disabled={transcript.trim() === '' || isRecording}
  />
  <p className="control-text">Send Message</p>
</div>
          </div>
        </div>
        <div className="transcript">
          <div className="message center">
            <p>Your message will be displayed here</p>
          </div>
          <p>{transcript}</p>
        </div>
        <Statistics incidentsReported={incidentsReported} volunteersSignedUp={volunteersSignedUp} />
      </div>
    </div>
  );
}
export default Home;
