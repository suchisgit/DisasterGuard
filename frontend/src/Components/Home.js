import React, { useEffect, useState, useContext } from 'react';
import { FaMicrophone, FaStop, FaRedo, FaPaperPlane } from 'react-icons/fa';
import configData from '../config.json';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Home.css';
import Slider from 'react-slick';
import { AuthContext } from '../context/AuthProvider';
import { FaExclamationCircle, FaUser, FaHandshake } from 'react-icons/fa';

const Statistics = ({ incidentsReported, peopleSaved, volunteersSignedUp }) => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    incidentsReported: 0,
    peopleSaved: 0,
    volunteersSignedUp: 0
  });

  // Animate numbers on component mount
  useEffect(() => {
    const animateNumbers = () => {
      const animationSpeed = 6000; // Adjust animation speed as needed for a slower animation
      const steps = 50; // Number of steps in animation
      const stepValue = {
        incidentsReported: Math.ceil(incidentsReported / steps),
        peopleSaved: Math.ceil(peopleSaved / steps),
        volunteersSignedUp: Math.ceil(volunteersSignedUp / steps)
      };

      // Animate each number separately
      const animate = (target, property) => {
        let current = 0;
        const increment = () => {
          if (current < target) {
            current += stepValue[property];
            setAnimatedNumbers(prevState => ({
              ...prevState,
              [property]: current
            }));
            setTimeout(increment, animationSpeed / steps);
          } else {
            setAnimatedNumbers(prevState => ({
              ...prevState,
              [property]: target
            }));
          }
        };
        increment();
      };

      animate(incidentsReported, 'incidentsReported');
      animate(peopleSaved, 'peopleSaved');
      animate(volunteersSignedUp, 'volunteersSignedUp');
    };

    animateNumbers();
  }, [incidentsReported, peopleSaved, volunteersSignedUp]);

  return (
    <div className="statistics">
    <div className="statistic">
      <h3>{animatedNumbers.incidentsReported}</h3>
      <p>
        <span>INCIDENTS REPORTED</span>
        <FaExclamationCircle className="statistic-icon red" />
      </p>
    </div>
    <div className="statistic">
      <h3>{animatedNumbers.peopleSaved}</h3>
      <p>
        <span>PEOPLE SAVED</span>
        <FaUser className="statistic-icon green" />
      </p>
    </div>
    <div className="statistic">
      <h3>{animatedNumbers.volunteersSignedUp}</h3>
      <p>
        <span>VOLUNTEERS REGISTERED</span>
        <FaHandshake className="statistic-icon blue" />
      </p>
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
  const [peopleSaved, setpeopleSaved] = useState(0);
  const [volunteersSignedUp, setVolunteersSignedUp] = useState(0);
  const [incidentsReported, setIncidentsReported] = useState(0);
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
    const fetchIncidentsReported = async () => {
      try {
        const response = await axios.get(API + 'incidentCount');
        setIncidentsReported(response.data.incidentCount);
      } catch (error) {
        console.error('Error fetching incidents reported:', error.message);
      }
    };
    fetchIncidentsReported();
  }, []);

  useEffect(() => {
    const fetchpeopleSaved = async () => {
      try {
        const response = await axios.get(API + 'totalSavesCount');
        setpeopleSaved(response.data.totalSavesCount);
      } catch (error) {
        console.error('Error fetching incidents reported:', error.message);
      }
    };
    fetchpeopleSaved();
  }, []);
  
  useEffect(() => {
    // Fetch volunteer count
    const fetchVolunteerCount = async () => {
      try {
        const response = await axios.get(API + 'volunteerCount');
        console.log(response.data)
          setVolunteersSignedUp(response.data.count);
      } catch (error) {
        console.error('Error fetching volunteer count:', error.message);
      }
    };
    fetchVolunteerCount();
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
        <div className="transcript-container">
  <div className="message center">
    <p>Your message will be displayed here</p>
  </div>
  <div className="transcript">
    <p>{transcript}</p>
  </div>
</div>
        <Statistics peopleSaved={peopleSaved} volunteersSignedUp={volunteersSignedUp} incidentsReported={incidentsReported} />
      </div>
    </div>
  );
}
export default Home;
