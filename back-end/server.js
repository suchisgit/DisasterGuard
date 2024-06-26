require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001
const User = require('./model/userModel')
const DisasterIncident = require('./model/disasterIncidentModel')
const VolunteerSave = require('./model/volunteerSaveModel')
const IncidentVariable = require('./model/incidentVariableModel')
const cors = require("cors")
const twilio = require("twilio")
const axios = require('axios')
const Gemini_API_KEY = process.env.API_KEY;
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const {twitterClient} = require("./twitterClient.js");
const { ObjectId } = require('mongodb');

const API = "http://localhost:3001/"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_PHONE_NUMBER
const client = twilio(accountSid, authToken);

// twitter start

// *** change callback url in twitter developer profile -> http://localhost:3000/twitter/return

// var passport = require('passport');
// var Strategy = require('passport-twitter').Strategy;
// var session = require('express-session');

// console.log(process.env.X_ACCESS_TOKEN)
// passport.use(new Strategy({
//   consumerKey: process.env.X_CONSUMER_API_KEY,
//   consumerSecret: process.env.X_CONSUMER_API_SECERT,
//   callbackURL: 'http://localhost:3000/twitter/return'
//   }, function(token, tokenSecret, profile, callback) {
//   const configs = createConfigs(token, tokenSecret);
//   })
//   );

// passport.serializeUser(function(user, callback) {
//   callback(null, user);
// })

// passport.deserializeUser(function(obj, callback) {
//   callback(null, obj);
// })

// app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))
// app.use(passport.initialize())
// app.use(passport.session())

// app.get('/twitter/login', passport.authenticate('twitter'))

// app.get('/twitter/return', passport.authenticate('twitter', {
//     failureRedirect: '/'
// }), function(req, res) {
//     res.redirect('/')
// })

// twitter end

app.use(
    cors({
      origin: "*",
    })
  )

  app.listen(port, () => {
    console.log(`Disaster Guard is running on ${port}`)
  })
  app.use(express.json());

  mongoose.connect("mongodb+srv://finalproject:disaster@cluster-disastermanagem.gnjbawn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-DisasterManagement")
  .then(() => {

    console.log('Connected!')

    app.get('/', (req, res) => {
        res.send('Welcome to Dissterguard Back-End!')
      })
    
    // add user 
    app.post('/addUser', async (req, res) => {
      try {
        console.log("here")
        console.log(req.body)
        const user = await User.create(req.body)
        res.status(200).json(JSON.stringify(user))
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })


    // to get user based on email
    app.get('/user/:email', async(req,res) => {
      try {
        const {email} = req.params
        const user = await User.findOne({ email: email })
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user)
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // update user details
    app.patch('/updateUser', async(req,res) => {
      try{
        const oldData = await User.findOne({email: req.body.email})
        console.log(oldData);
        const user = await User.findOneAndUpdate(
          {_id: oldData._id} , 
          {$set: { 
                   "name" : req.body.name,
                   "type" : oldData.role,
                   "password" : req.body.password,
                   "phoneNumber" : req.body.phoneNumber,
                   "address" : req.body.address,
                   "latitude" : req.body.latitude,
                   "longitude" : req.body.longitude
         }},
          {new : true}
          );
        console.log(user);
        if(!user){
          res.status(404).json({ message: `cannot find any user with email ${oldData.email}` })
        }else{
          res.status(200).json({ message: `updated user with email ${oldData.email}` })
        }
      }catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // to validate user name and password of user
    app.post('/user/validate', async (req, res) => {
      try {
        const givenEmail = req.body.email
        const givenPassword = req.body.password
        const user = await User.findOne({ email: givenEmail })
        if (!user) {
          return res.status(401).json({ login: false })
        }
        if (user.email == givenEmail && user.password == givenPassword) {

          res.status(200).json({ login: true, email: user.email, role: user.role, name: user.name, phoneNumber: user.phoneNumber, emergencyContact: user.emergencyPhoneNumber });
        } else {
          res.status(401).json({ login: false })
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // make user as volunteer 
    app.patch('/user/updateUserMembership/', async (req, res) => {
      try {
        console.log("update user")
        const email = req.body.email
        const user = await User.findOne({ email: email })
        // console.log(startDate)
        // console.log(endDate)
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.role = "volunteer"
        await user.save();
        res.status(200).json({ success: true, message: 'User record updated & successfully made as volunteer.' })
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })


    // openAI api integration to detect if it's a danger word or not
    app.post('/isDisasterOpenAI', async (req,res) =>{
      try{
        const usersInput = req.body.voiceToTextData
        const prompt = "Strictly give me a one word answer which should be either yes or no, based on the given voice recording data of the person do you think the person is in an emergency situation, here is the voice recording data :" + usersInput + "?"
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            prompt,
            max_tokens: 5,
            temperature: 0.7,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        });
      } catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // add user 
    app.post('/addIncident', async (req, res) => {
      try {
        console.log(req.body)
        const disasterLocation = await DisasterIncident.create(req.body)
        const incrementIncidentCount = await axios.post(`${API}incrementCount`)
        console.log(incrementIncidentCount)
        console.log("incremented IncidentCount")
        res.status(200).json(JSON.stringify(disasterLocation))
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // volunteer save count increment
    app.post('/saveThisPerson', async(req,res) => {
      try {
        console.log("brosky......")
        const volunteerEmail = req.body.email
        const incidentId = req.body.incidentId
        console.log("incident id:", incidentId)
        console.log({"volunteerEmail" : volunteerEmail})
        const volunteer = await VolunteerSave.findOne({"volunteerEmail" : volunteerEmail})
        console.log(volunteer)
        if (volunteer){
          volunteer.savesCount += 1;
          await volunteer.save();
          await axios.delete(`${API}incident/${incidentId}`)
          res.status(200).json({success : "incremented volunteer count by 1"} )
        }else{
          volunteerReqBody = { "volunteerEmail" : volunteerEmail , "incidentId" : incidentId, "savesCount": 1}
          console.log(volunteerReqBody)
          const saveVolunteer = await VolunteerSave.create(volunteerReqBody)
          console.log(saveVolunteer)
          await axios.delete(`${API}incident/${incidentId}`)
          res.status(200).json( {success : "first save for this volunteer, incremented volunteer count to 1"} )
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // to get the count of total volunteers
    app.get('/volunteerCount', async(req,res) => {
      try {
        const volunteerCount = await User.countDocuments({role: "volunteer" })
        res.status(200).json({ count : volunteerCount})
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // total number of saves
    app.get('/totalSavesCount', async(req,res) => {
      try {
        const totalSaves = await VolunteerSave.aggregate([
          {
              $group: {
                  _id: null,
                  totalSaves: { $sum: "$savesCount" }
              }
          }
          ]);
          console.log(totalSaves)
          if (totalSaves.length > 0) {
              res.status(200).json({ totalSavesCount: totalSaves[0].totalSaves });
          } else {
              res.status(200).json({ totalSavesCount: 0 });
          }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    app.post('/incrementCount', async(req,res)=>{
      try {
        const incidentVariable = await IncidentVariable.findOne();
        // If the incident variable document doesn't exist, create one with count initialized to 1
        if (!incidentVariable) {
            const newIncidentVariable = new IncidentVariable({ incidentCount: 1 });
            await newIncidentVariable.save();
            return res.status(200).json({ message: 'Incremented count by 1', newCount: 1 });
        }

        // Increment the count by one
        incidentVariable.incidentCount += 1;
        await incidentVariable.save();

        return res.status(200).json({ message: 'Incremented count by 1', newCount: incidentVariable.incidentCount });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
      }
    })

    // Gemini AI API utilization to detect if it's a danger or not
    app.post('/isDisaster', async (req,res) =>{
      try{
        console.log("is disaster api called!")
        const MODEL_NAME = "gemini-1.0-pro";
        const genAI = new GoogleGenerativeAI(Gemini_API_KEY);
        const usersInput = req.body.voiceToTextData
        const userEmail = req.body.email
        const userPhoneNumber = req.body.phoneNumber
        const userCurrentLongitude = req.body.longitude
        const userCuurentLatitude = req.body.latitude
        const model = genAI.getGenerativeModel({ model: MODEL_NAME});
        console.log(req.body)
        const previousPrompt = `Strictly give me a one word answer which should be either yes or no, 
        based on the given voice recording data of the person do you think the person is in an 
        emergency situation, here is the voice recording data :` + usersInput + "?";
        const prompt = `Strictly give me a single numeric answer, either 1 or 2 or 3,based on 
        the given voice recording data of the person. Do you think the person is in an emergency situation 
        strictly related to a natural disaster, 1 being the least or no emergency 3 being the highest emergency.
        Here is the voice recording data :` + usersInput + ". If the input is not related to disaster, answer it as 1";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text_output = response.text();
        console.log(text_output)
        if (text_output == "2" || text_output == "3" ){
          console.log("TWO OR THREE")
          if (userEmail.trim() !== ''){
            console.log("EMAIL EXIST")
              const oldData = await User.findOne({email: userEmail})
              // updating current users location in the DB
              const updateLocation = await User.findOneAndUpdate(
                {_id : oldData._id},
                { $set: {
                    "latitude" : userCuurentLatitude,
                    "longitude" : userCurrentLongitude
                }},
                {new : true}
              )
              console.log("updated Location");
          }
          console.log("Incidet.....")
          addIncidentReqBody = { "voicemessage" : usersInput , "userPhoneNumber" : userPhoneNumber, "latitude" : userCuurentLatitude, "longitude" : userCurrentLongitude }
          const reportIncident = await axios.post(API + 'addIncident', addIncidentReqBody)
          console.log("report Incident")

          // if 3 -> post on social media and send message to emergency contact
          if (text_output == "3"){
            console.log("THREE")
            if (userEmail.trim() !== ''){
              console.log("EMAIL EXIST")
                const oldData = await User.findOne({email: userEmail})
                messageBody = { 
                  "message" : "\nHello, " + oldData.emergencyName + "\n"  + oldData.name + " is in danger, they have chosen you as your emergency contact, Please help them. \n This is the location co-ordinates of the user {"+ oldData.latitude + ","+ oldData.longitude + "}. \n - Team DisasterGuard",
                  "emergencyNumber" : "+1" + oldData.emergencyPhoneNumber
                }
                tweetBody = {
                  "msg" : " Note: This is just a sample tweet posted on behlaf of Disaster Guard APP. \n Person " +oldData.emergencyName +" is in danger. Need Assistance. This is the location co-ordinates of the user {"+ oldData.latitude + ","+ oldData.longitude + "}. \n - Team DisasterGuard \n #disasterGuardApplication"
                }
                console.log(messageBody)
                // sending message
                const message = axios.post(API+ 'sms',messageBody).then(response => {
                  console.log("message sent"+ message)
                  console.log(reponse.status)
                }).catch(error => {
                  console.log("Error sending message:", error)
                });
                const tweet = axios.post(API + 'tweet',tweetBody).then(response => 
                  { 
                    console.log("tweeted" + tweet)
                    console.log(response.status);
                  }).catch(error => {
                    console.error("Error tweeting:", error);
                  });
            }else{
              console.log("EMAIL doesn't  EXIST log in level-3 danger")
            }
          }
        }
        res.status(200).json({ responseFromAIModel: text_output });
      }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })

    // all incidents
    app.get('/allIncidents', async(req,res) => {
      try {
        const allIncidents = await DisasterIncident.find({});
        res.status(200).json(allIncidents)
      } catch (error) {
        console.log(error)
      }
    })

    // delete incident
    app.delete('/incident/:id', async(req,res)=>{
      try {
        const incidentId = req.params.id;
        const deletedIncident = await DisasterIncident.findByIdAndDelete(incidentId);
        console.log(deletedIncident)
        if (!deletedIncident) {
          return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(200).json({ message: 'Incident deleted successfully' });
      } catch (error) {
        console.log(error)
      }
    })
   
    // count Incidents
    app.get('/incidentCount', async (req, res) => {
      try {
          const incidentCount = await IncidentVariable.findOne();
          console.log(incidentCount.incidentCount)
          res.status(200).json({ incidentCount: incidentCount.incidentCount });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
      }
    });

    // to get all the incidents from the db
    app.get('/allIncidentLocations', async(req,res)=>{
      try {
        const allIncidents = await DisasterIncident.find({});
        const locations = allIncidents.map( incident => {
          if (incident.latitude && incident.longitude){
            return {
              latitude : incident.latitude,
              longitude: incident.longitude
            };
          }
          return null;
        }).filter(location => location != null);
        res.status(200).json(locations);
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })


    // to post a tweet uncomment later ( need to resolve issue)
    app.post('/tweet',async(req,res)=>{
      try {
        console.log(req.body.msg);
        const tweet = await twitterClient.v2.tweet(req.body.msg);
        res.status(200).json({ "twitterapiresponse": "tweet successful" });
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
      }
    })
    
    // send sms
    app.post('/sms',async (req,res) => {
      try {
        const message = await client.messages
        .create({
            body: req.body.message,
            from: twilioNumber,
            to: req.body.emergencyNumber 
        })
        console.log("Message SID:",message.sid);
        res.status(200).json({ "messagestatus": "message sent successfully" });
      } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
      }
    })
  })