import React, { useEffect, useState } from 'react';
import { FaMicrophone, FaStop, FaRedo, FaPaperPlane } from 'react-icons/fa'; // Import FaPaperPlane icon
import configData from '../config.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Home.css'; // Import CSS for styling

function Home() {
  const [isContinuous, setIsContinuous] = useState(false);
  const [isRecording, setIsRecording] = useState(false);


  const API = configData.API;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {}, []);

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

  const handleSendMessage = () => {
    // Implement your logic to send the message here
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Voice Assistance</h1>
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
              style={{ fontSize: '32px', cursor: 'pointer' }}
            />
            <p className="control-text">Stop Listening</p>
          </div>
          <div className="icon-container">
            <FaRedo
              className="icon"
              onClick={resetTranscript}
              style={{ fontSize: '32px', cursor: 'pointer' }}
            />
            <p className="control-text">Reset Transcript</p>
          </div>
          <div className="icon-container">
            <FaPaperPlane
              className="icon"
              onClick={handleSendMessage}
              style={{ fontSize: '32px', cursor: 'pointer' }}
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
    </div>
  );
}
export default Home;
