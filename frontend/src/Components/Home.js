import React, { useEffect, useState } from 'react';

import configData from '../config.json';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Home() {
  
  const [isContinuous, setIsContinuous] = useState(false);
  const API = configData.API;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  

  useEffect(() => {
   
  }, []);

  const handleStartListening = () => {
    setIsContinuous(true); // Update isContinuous to true
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    setIsContinuous(false); // Update isContinuous to false
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <div className='row center'>
        <h1>Voice assistance</h1>
      </div>
      <div className='row'>
        <div className='col-9 offset-1'>
          <p>Are you in danger?</p>
        </div>
      </div>
      <div className='row center'>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        
        <button onClick={handleStartListening}>Start</button>
        <button onClick={handleStopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default Home;
