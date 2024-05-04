require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001
const User = require('./model/userModel')
const cors = require("cors")
const Gemini_API_KEY = process.env.API_KEY;
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// facebook start
// const passport = require('passport');
// const session = require('express-session');
// const FacebookStrategy = require('passport-facebook').Strategy;
// require('dotenv').config();

// app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: 'http://localhost:3000/auth/facebook/callback'
// },
// (accessToken, refreshToken, profile, done) => {
//   // Here you can save the accessToken to your database for the specific user
//   return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// facebook end
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
                   "address" : req.body.address
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

          res.status(200).json({ login: true, email: user.email, role: user.role, name: user.name });
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

    // Gemini AI API utilization to detect if it's a danger or not
    app.get('/isDisaster', async (req,res) =>{
      try{
        const MODEL_NAME = "gemini-1.0-pro";
        const genAI = new GoogleGenerativeAI(Gemini_API_KEY);
        const usersInput = req.body.voiceToTextData
        const model = genAI.getGenerativeModel({ model: MODEL_NAME});
        const previousPrompt = `Strictly give me a one word answer which should be either yes or no, 
        based on the given voice recording data of the person do you think the person is in an 
        emergency situation, here is the voice recording data :` + usersInput + "?";
        const prompt = `Strictly give me a one word answer which should be either 
        1 or 2 or 3,based on the given voice recording data of the person 
        do you think the person is in an emergency situation related to a natural disaster, 1 
        being the least or no emergency 3 being the highest emergency, 
        here is the voice recording data :` + usersInput + "?";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text_output = response.text();
        res.status(200).json({ responseFromAIModel: text_output });
      }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
      }
    })
  })