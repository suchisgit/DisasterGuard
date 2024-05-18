# DisasterGuard

## steps to recreate

### step1: <br>
git clone https://github.com/suchisgit/DisasterGuard.git <br>

### step 2: <br>
It has multiple API Keys dependecies, generate all the necessary API keys and develope an env file of this format. Replace XXXXXX with your actual Keys <br>

**in /frontend/.env :** <br>
  <br>
  REACT_APP_GOOGLE_MAPS_API_KEY = XXXXXX <br>

**in /back-end/.env : <br>**
  <br>
  X_APP_ID = XXXXXX <br>
  X_CLIENT_ID = XXXXXX <br>
  X_CLIENT_SECERET = XXXXXX <br>
  X_BEARER_TOKEN = XXXXXX <br> <br>

  TWILIO_RECOVERY_CODE = XXXXXX <br>
  TWILIO_PHONE_NUMBER = XXXXXX <br>
  TWILIO_ACCOUNT_SID = XXXXXX <br>
  TWILIO_AUTH_TOKEN = XXXXXX <br>

### step 3: <br>
 change directory to frontend and start app <br>
   **commands: <br>** 
   <br>
     cd DisasterGuard/frontend <br>
     npm install <br>
     npm start <br>

### step 4: <br>
 change directory to back-end and start app <br>
   commands: <br>
   <br>
     cd DisasterGuard/back-end <br>
     npm install <br>
     npm start <br>

### step 5: <br>
  After above steps are performed you should be able to see the disaster guard application running in localhost:3000, We have later hosted the application in EC2 the used that public IP to show in our application.
     

