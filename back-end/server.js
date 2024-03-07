const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

const cors = require("cors")

app.use(
    cors({
      origin: "*",
    })
  )

  app.listen(port, () => {
    console.log(`Gym Management app is running on ${port}`)
  })

  mongoose.connect("mongodb+srv://finalproject:disaster@cluster-disastermanagem.gnjbawn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-DisasterManagement")
  .then(() => {

    app.get('/', (req, res) => {
        res.send('Hello GYM!')
      })
    
    console.log('Connected!')
  })



// const express = require('express')
// const mongoose = require('mongoose');
// const app = express()
// const port = 3000
// const Membership = require('./model/membershipModel')
// const User = require('./model/userModel')
// const Admin = require('./model/adminModel')
// const Activity = require('./model/activityModel')
// const Class = require('./model/classModel')
// const Booking = require('./model/bookingModel')
// const LogMachineTracking = require('./model/logMachineTrackingModel')
// const CheckInNOut = require('./model/checkInNOutModel')
// const MembershipPlan = require('./model/membershipPlan')

// const cors = require("cors")
// const moment = require('moment');

// // Schedule the cron job to run at midnight every day

// app.use(express.json())

// require('dotenv').config();

// app.use(
//   cors({
//     origin: "*",
//   })
// )

// //hard coded need to change if we change activities in DB
// const activityMap = new Map();
// activityMap.set("1", "boxing")
// activityMap.set("2", "cardio")
// activityMap.set("3", "strength")
// activityMap.set("4", "yoga")
// activityMap.set("5", "zumba")

// const caloriesMap = new Map();
// caloriesMap.set("1", 325)
// caloriesMap.set("2", 180)
// caloriesMap.set("3", 390)
// caloriesMap.set("4", 120)
// caloriesMap.set("5", 300)

// const machineSet = new Set();
// machineSet.add('Treadmill')
// machineSet.add('Cross Fit')
// machineSet.add('Cross Ramp')
// machineSet.add('Excercise Bike')
// machineSet.add('Rowing Machine')

// const machineCaloriesMap = new Map();
// machineCaloriesMap.set("Treadmill", 258)
// machineCaloriesMap.set("Cross Fit", 460)
// machineCaloriesMap.set("Cross Ramp", 390)
// machineCaloriesMap.set("Excercise Bike", 500)
// machineCaloriesMap.set("Rowing Machine", 600)

// app.listen(port, () => {
//   console.log(`Gym Management app is running on ${port}`)
// })

// mongoose.connect("mongodb+srv://suchandranathbajjuri:Suchi7@cluster202.v83m9mk.mongodb.net/Gym_Management?retryWrites=true&w=majority")
//   .then(() => {

//     app.post('/createTodaysClasses', async (req, res) => {
//       // Code to run at the beginning of a new day

//       try {
//         // console.log("Triggered!!!!!!!");
//         const now = new Date();
//         for (let i = 0; i < 20; i++) {
//           now.setDate(now.getDate() + 1);
//           const todaysDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
//           const today7 = new Date(todaysDate.getTime() + 7 * 60 * 60 * 1000);
//           const today8 = new Date(todaysDate.getTime() + 8 * 60 * 60 * 1000);
//           const today9 = new Date(todaysDate.getTime() + 9 * 60 * 60 * 1000);
//           const today10 = new Date(todaysDate.getTime() + 10 * 60 * 60 * 1000);
//           const today11 = new Date(todaysDate.getTime() + 11 * 60 * 60 * 1000);
//           const req1 = { "activityId": "1", "location": "San jose", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "yogesh" }
//           const req2 = { "activityId": "2", "location": "San jose", "startTime": today8, "endTime": today9, "capacity": 20, "instructor": "Preethi" }
//           const req3 = { "activityId": "3", "location": "San jose", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "Madhuri" }
//           const req4 = { "activityId": "4", "location": "San jose", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "Suchandra" }
//           const req13 = { "activityId": "5", "location": "San jose", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "yogesh" }

//           const req5 = { "activityId": "1", "location": "Milpitas", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "Suchandra" }
//           const req6 = { "activityId": "2", "location": "Milpitas", "startTime": today8, "endTime": today9, "capacity": 20, "instructor": "Srujith" }
//           const req7 = { "activityId": "3", "location": "Milpitas", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "Nitish" }
//           const req8 = { "activityId": "4", "location": "Milpitas", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "Saketh" }
//           const req14 = { "activityId": "5", "location": "Milpitas", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "yogesh" }

//           const req9 = { "activityId": "1", "location": "Sunnyvale", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "Vishal" }
//           const req10 = { "activityId": "2", "location": "Sunnyvale", "startTime": today7, "endTime": today8, "capacity": 20, "instructor": "Srujith" }
//           const req11 = { "activityId": "3", "location": "Sunnyvale", "startTime": today9, "endTime": today10, "capacity": 20, "instructor": "Preethi" }
//           const req12 = { "activityId": "4", "location": "Sunnyvale", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "Madhuri" }
//           const req15 = { "activityId": "5", "location": "Sunnyvale", "startTime": today10, "endTime": today11, "capacity": 20, "instructor": "Suchandra" }

//           const req16 = { "activityId": "1", "location": "Mountain View", "startTime": today7, "endTime": today8, "capacity": 10, "instructor": "satya" }
//           const req17 = { "activityId": "2", "location": "Mountain View", "startTime": today7, "endTime": today8, "capacity": 10, "instructor": "sundar" }
//           const req18 = { "activityId": "3", "location": "Mountain View", "startTime": today9, "endTime": today10, "capacity": 10, "instructor": "Jhon" }
//           const req19 = { "activityId": "4", "location": "Mountain View", "startTime": today10, "endTime": today11, "capacity": 10, "instructor": "satya" }
//           const req20 = { "activityId": "5", "location": "Mountain View", "startTime": today10, "endTime": today11, "capacity": 10, "instructor": "Jhon" }


//           await Class.create(req1);
//           await Class.create(req2);
//           await Class.create(req3);
//           await Class.create(req4);
//           await Class.create(req5);
//           await Class.create(req6);
//           await Class.create(req7);
//           await Class.create(req8);
//           await Class.create(req9);
//           await Class.create(req10);
//           await Class.create(req11);
//           await Class.create(req12);
//           await Class.create(req13);
//           await Class.create(req14);
//           await Class.create(req15);
//           await Class.create(req16);
//           await Class.create(req17);
//           await Class.create(req18);
//           await Class.create(req19);
//           await Class.create(req20);

//         }
//         res.status(200).json({ message: "succesfully created one week classes at all the locations" });
//         console.log("created one week classes");

//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }

//     })

//     app.get('/', (req, res) => {
//       res.send('Hello GYM!')
//     })
//     console.log('Connected!')

//     app.get('/gym', (req, res) => {
//       res.send('inside 202 Gym')
//     })

//     // gets all the avilable member ids along with user ids
//     app.get('/members', async (req, res) => {
//       try {
//         const memberships = await Membership.find({});
//         res.status(200).json(memberships);
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // gets an individual memberid based on _id
//     app.get('/members/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const membership = await Membership.findById(id);
//         res.status(200).json(membership);
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // adds membershipId  and userId
//     app.post('/addMembership', async (req, res) => {
//       try {
//         const membership = await Membership.create(req.body)
//         res.status(200).json(membership)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //delete a membership based on _id
//     app.delete('/members/:id', async (req, res) => {
//       try {
//         const { id } = req.params;
//         const membership = await Membership.findByIdAndDelete(id);
//         if (!membership) {
//           res.status(404).json({ message: `cannot find any membership with ${id}` })
//         }
//         res.status(200).json({ message: `deleted membership with ${id}` });
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- User specific endpoints -----------------------------------

//     // add user 
//     app.post('/addUser', async (req, res) => {
//       try {
//         const user = await User.create(req.body)
//         res.status(200).json(user)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // to validate user name and password of user
//     app.post('/user/validate', async (req, res) => {
//       try {
//         const givenUserId = req.body.userId
//         const givenPassword = req.body.password
//         const user = await User.findOne({ userId: givenUserId })
//         if (!user) {
//           return res.status(401).json({ login: false })
//         }
//         if (user.userId == givenUserId && user.password == givenPassword) {

//           res.status(200).json({ userId: user.userId, role: user.role, email: user.email, name: user.name });
//         } else {
//           res.status(401).json({ login: false })
//         }
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // gets all users information
//     app.get('/user', async (req, res) => {
//       try {
//         const users = await User.find({})
//         res.status(200).json(users)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //get only non members
//     app.get('/getnonmembers', async (req, res) => {
//       try {
//         const users = await User.find({ role: "Non Member" })
//         res.status(200).json(users)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific user based on _id
//     app.get('/user/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const users = await User.findById(id)
//         res.status(200).json(users)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to delete a specific user
//     app.delete('user/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const user = await User.findByIdAndDelete(id)
//         if (!user) {
//           res.status(404).json({ message: `cannot find any user with ${id}` })
//         }
//         res.status(200).json({ message: `deleted user with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to update a specific user details based on _id
//     app.put('/user/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const user = await User.findByIdAndUpdate(id, req.body)
//         if (!user) {
//           res.status(404).json({ message: `cannot find any user with ${id}` })
//         }
//         res.status(200).json({ message: `updated user with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // make non-member user as member 
//     app.patch('/user/updateUserMembership/', async (req, res) => {
//       try {
//         const userId = req.body.userId
//         const months = req.body.months
//         const startDate = new Date();
//         const endDate = new Date(startDate.getTime());
//         endDate.setMonth(startDate.getMonth() + months);
//         const user = await User.findOne({ userId: userId })
//         // console.log(startDate)
//         // console.log(endDate)
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         user.role = "Member"
//         user.membershipStartDate = startDate
//         user.membershipEndDate = endDate
//         await user.save();
//         res.status(200).json({ success: true, message: 'User record updated & successfully made as member.' })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- Admin specific endpoints -----------------------------------

//     // add admin 
//     app.post('/addAdmin', async (req, res) => {
//       try {
//         const admin = await Admin.create(req.body)
//         res.status(200).json(admin)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // to validate user name and password of admin
//     app.post('/admin/validate', async (req, res) => {
//       try {
//         const givenAdminId = req.body.adminId
//         const givenPassword = req.body.password
//         const admin = await Admin.findOne({ adminId: givenAdminId })
//         if (!admin) {
//           return res.status(401).json({ login: false })
//         }
//         if (admin.adminId == givenAdminId && admin.password == givenPassword) {
//           res.status(200).json({ login: true })
//         } else {
//           res.status(401).json({ login: false })
//         }
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // gets all admins information
//     app.get('/admin', async (req, res) => {
//       try {
//         const admins = await Admin.find({})
//         res.status(200).json(admins)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific admin based on _id
//     app.get('/admin/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const admins = await Admin.findById(id)
//         res.status(200).json(admins)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to delete a specific admin
//     app.delete('admin/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const admin = await Admin.findByIdAndDelete(id)
//         if (!admin) {
//           res.status(404).json({ message: `cannot find any admin with ${id}` })
//         }
//         res.status(200).json({ message: `deleted admin with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })
//     //to update a specific admin details
//     app.put('/admin/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const admin = await Admin.findByIdAndUpdate(id, req.body)
//         if (!admin) {
//           res.status(404).json({ message: `cannot find any admin with ${id}` })
//         }
//         res.status(200).json({ message: `updated admin with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- Activity specific endpoints -----------------------------------

//     // add activity 
//     app.post('/addActivity', async (req, res) => {
//       try {
//         const activity = await Activity.create(req.body)
//         res.status(200).json(activity)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // gets all activitys information
//     app.get('/activity', async (req, res) => {
//       try {
//         const activitys = await Activity.find({})
//         res.status(200).json(activitys)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // get activity id based on activity name
//     app.get('/activityByName/:name', async (req, res) => {
//       try {
//         const activityName = req.params.name;
//         // console.log(activityName)
//         const activityId = await Activity.findOne({ activityname: activityName })
//         if (!activityId) {
//           return res.status(404).json({ message: 'Activity not found' });
//         }
//         res.status(200).json(activityId);
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific activity based on _id
//     app.get('/activity/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const activitys = await Activity.findById(id)
//         res.status(200).json(activitys)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to delete a specific activity
//     app.delete('activity/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const activity = await Activity.findByIdAndDelete(id)
//         if (!activity) {
//           res.status(404).json({ message: `cannot find any activity with ${id}` })
//         }
//         res.status(200).json({ message: `deleted activity with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- Class specific endpoints -----------------------------------

//     // add class 
//     app.post('/addClass', async (req, res) => {
//       try {
//         const classe = await Class.create(req.body)
//         res.status(200).json(classe)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // return activity to hours for a single user in the given date time range
//     app.post('/activityHoursSpent', async (req, res) => {
//       try {
//         const userId = req.body.userId
//         const startDate = new Date(req.body.startDate)// need to check if i get a data object or just in string format
//         const endDate = new Date(req.body.endDate)
//         const bookings = await Booking.find({ userId: userId })
//         const classIds = [];
//         const response = { resJson: [] }
//         bookings.forEach((booking) => {
//           classIds.push(booking.classId)
//         });
//         // console.log("classes");
//         // console.log(classIds)
//         // classIds.forEach( (classId)=>{
//         //   console.log(classIds)
//         // })
//         const promises = []
//         activityMap.forEach((activityName, activityId) => {
//           let activityCount = 0
//           classIds.forEach((classId) => {
//             // console.log({ activityId : activityId , classId : classId})
//             const promise = Class.findOne({ activityId: activityId, classId: classId }).then((docs) => {
//               if (docs) {
//                 if (docs.startTime >= startDate && docs.endTime <= endDate) {
//                   activityCount = activityCount + (docs.endTime - docs.startTime) / (1000 * 60 * 60);
//                   // const hoursDifference = differenceMs / (1000 * 60 * 60);
//                 }
//               }
//             })
//             promises.push(promise)
//           })
//           Promise.all(promises).then(() => {
//             // console.log("answers")
//             // console.log({activityName : activityName, activityCount: activityCount});
//             response.resJson.push({ activityName: activityName, activityHours: activityCount, caloriesBurnt: activityCount * caloriesMap.get(activityId) })
//           })
//         })
//         Promise.all(promises).then(() => {
//           res.status(200).json(response.resJson);
//         })

//         // res.status(200).json(response.resJson);
//         // setTimeout(() => {
//         //   res.status(200).json(response.resJson);
//         // }, 3000);
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //machine hours spent
//     app.post('/machineHoursSpent', async (req, res) => {
//       const userId = req.body.userId
//       const startDate = new Date(req.body.startDate)// need to check if i get a data object or just in string format
//       const endDate = new Date(req.body.endDate)
//       const machineToHourMap = new Map()
//       const promises = []
//       machineSet.forEach((machine) => {
//         const promise = LogMachineTracking.find({ userId: userId, machineName: machine }).then((logMachinetracking) => {
//           logMachinetracking.forEach((logMachine) => {
//             // console.log(type(logMachine.startTime),type(startDate))
//             // console.log(logMachine.endTime,endDate)
//             if ((logMachine.startTime >= startDate && logMachine.endTime <= endDate)) {
//               if (machineToHourMap.has(logMachine.machineName)) {
//                 const hrs = machineToHourMap.get(logMachine.machineName) + (logMachine.endTime - logMachine.startTime) / (1000 * 60 * 60)
//                 machineToHourMap.set(logMachine.machineName, hrs)
//               } else {
//                 const ihrs = (logMachine.endTime - logMachine.startTime) / (1000 * 60 * 60)
//                 machineToHourMap.set(logMachine.machineName, ihrs)
//                 // console.log(machineToHourMap)
//               }
//             }
//           })
//         })
//         promises.push(promise)
//       })
//       Promise.all(promises).then(() => {
//         // console.log("map")
//         // console.log(machineToHourMap)
//         const result = { resJson: [] }
//         machineToHourMap.forEach((Hrs, machineName) => {
//           const caloriesBurnt = machineCaloriesMap.get(machineName) * Hrs
//           result.resJson.push({ machineName: machineName, hoursSpent: Hrs, caloriesBurnt: caloriesBurnt })
//         })
//         res.status(200).json(result.resJson)
//       })


//     })

//     // return future classes (one week) based on location
//     app.get('/futureClasses/:location', async (req, res) => {
//       try {
//         const location = req.params.location
//         const classes = await Class.find({ location: location })
//         const response = { jsonres: [] }
//         const currentDate = new Date();
//         const nextWeek = new Date();
//         nextWeek.setDate(nextWeek.getDate() + 7);
//         classes.forEach((classe) => {
//           if (classe.startTime >= currentDate && classe.endTime <= nextWeek) {
//             response.jsonres.push({ className: activityMap.get(classe.activityId), classId: classe.classId, startTime: classe.startTime, endTime: classe.endTime, instructor: classe.instructor })
//           }
//         })
//         res.status(200).json(response.jsonres)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // updated future class search which provides user specific booked or not booked
//     app.post('/futureClasses', async (req, res) => {
//       try {
//         const location = req.body.location
//         const userId = req.body.userId
//         const bookings = await Booking.find({ userId: userId })
//         const classes = new Set()
//         bookings.forEach((booking) => {
//           classes.add(booking.classId)
//         })
//         const classess = await Class.find({ location: location })
//         const response = { jsonres: [] }
//         const currentDate = new Date();
//         const nextWeek = new Date();
//         nextWeek.setDate(nextWeek.getDate() + 7);
//         classess.forEach((classe) => {
//           if (classes.has(classe.classId)) {
//             if (classe.startTime >= currentDate && classe.endTime <= nextWeek) {
//               response.jsonres.push({ className: activityMap.get(classe.activityId), classId: classe.classId, startTime: classe.startTime, endTime: classe.endTime, instructor: classe.instructor, booked: true })
//             }
//           } else {
//             if (classe.startTime >= currentDate && classe.endTime <= nextWeek) {
//               response.jsonres.push({ className: activityMap.get(classe.activityId), classId: classe.classId, startTime: classe.startTime, endTime: classe.endTime, instructor: classe.instructor, booked: false })
//             }
//           }
//         })
//         res.status(200).json(response.jsonres)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // return future classes (one week) of a user
//     app.get('/futureClass/:uId', async (req, res) => {
//       try {
//         const userId = req.params.uId
//         const bookings = await Booking.find({ userId: userId })
//         const classIds = [];
//         bookings.forEach((booking) => {
//           classIds.push(booking.classId)
//         });

//         const classesInfoJSc = { classesJson: [] }
//         // console.log(typeof classesInfoJSc);
//         // const classesInfoJSc = JSON.parse(JSON.stringify(classesInfo));
//         // const classe = await Class.findOne( { classId : "101" })
//         const promises = [];
//         const currentDate = new Date();
//         const nextWeek = new Date();
//         nextWeek.setDate(nextWeek.getDate() + 7);
//         classIds.forEach((classId) => {
//           // const classe = await Class.findOne( { classId : classId })
//           const promise = Class.findOne({ classId: classId }).then((classe) => {
//             if (classe) {
//               if (currentDate <= classe.startTime && classe.startTime <= nextWeek) {
//                 classesInfoJSc.classesJson.push({ className: activityMap.get(classe.activityId), classId: classe.classId, location: classe.location, startTime: classe.startTime, endTime: classe.endTime, instructor: classe.instructor })
//               }
//             }
//           }).catch((err) => {
//             console.log(err)
//           });
//           // console.log(classe); // printing as expected
//           promises.push(promise)
//         })
//         Promise.all(promises).then(() => {

//           res.status(200).json(classesInfoJSc.classesJson)
//         }).catch((err) => {
//           console.log(err);
//         });
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })
//     // gets all classes information
//     app.get('/class', async (req, res) => {
//       try {
//         const classes = await Class.find({})
//         res.status(200).json(classes)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific class based on _id
//     app.get('/class/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const classes = await Class.findById(id)
//         res.status(200).json(classes)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to delete a specific class
//     app.delete('class/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const classe = await Class.findByIdAndDelete(id)
//         if (!classe) {
//           res.status(404).json({ message: `cannot find any class with ${id}` })
//         }
//         res.status(200).json({ message: `deleted class with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to update a specific class details
//     app.put('/class/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const classe = await Class.findByIdAndUpdate(id, req.body)
//         if (!classe) {
//           res.status(404).json({ message: `cannot find any class with ${id}` })
//         }
//         res.status(200).json({ message: `updated class with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- Booking specific endpoints -----------------------------------

//     // add booking 
//     app.post('/addBooking', async (req, res) => {
//       try {
//         const booking = await Booking.create(req.body)
//         res.status(200).json(booking)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // to book a class 
//     app.post('/bookClass', async (req, res) => {
//       try {
//         // const userId = req.body.userId
//         // const classId = req.body.classId
//         const booking = await Booking.create(req.body)
//         res.status(200).json({ message: "successfully booked the class" })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })

//       }
//     })

//     // gets all bookings information
//     app.get('/booking', async (req, res) => {
//       try {
//         const bookings = await Booking.find({})
//         res.status(200).json(bookings)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific booking based on _id
//     app.get('/booking/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const bookings = await Booking.findById(id)
//         res.status(200).json(bookings)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to delete a specific booking
//     app.delete('booking/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const booking = await Booking.findByIdAndDelete(id)
//         if (!booking) {
//           res.status(404).json({ message: `cannot find any booking with ${id}` })
//         }
//         res.status(200).json({ message: `deleted booking with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //to update a specific booking details
//     app.put('/booking/:id', async (req, res) => {
//       try {
//         const { id } = req.params
//         const booking = await Booking.findByIdAndUpdate(id, req.body)
//         if (!booking) {
//           res.status(404).json({ message: `cannot find any booking with ${id}` })
//         }
//         res.status(200).json({ message: `updated booking with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // ------------------------------- logMachineTracking specific endpoints -----------------------------------

//     // add logMachineTracking 
//     app.post('/addlogMachineTracking', async (req, res) => {
//       try {
//         const logMachineTracking = await LogMachineTracking.create(req.body)
//         res.status(200).json(logMachineTracking)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     // gets all logMachineTracking information
//     app.get('/logMachineTracking', async (req, res) => {
//       try {
//         const logMachineTrackings = await LogMachineTracking.find({})
//         res.status(200).json(logMachineTrackings)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: error.message })
//       }
//     })

//     //gets a specific logMachineTracking based on _id
//     app.get('/logMachineTracking/:id',async(req,res)=>{
//       try {
//         const {id} = req.params
//         const logMachineTrackings = await LogMachineTracking.findById(id)
//         res.status(200).json(logMachineTrackings)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     //to delete a specific logMachineTracking
//     app.delete('logMachineTracking/:id', async(req,res)=>{
//       try {
//         const {id} = req.params
//         const logMachineTracking = await LogMachineTracking.findByIdAndDelete(id)
//         if(!logMachineTracking){
//           res.status(404).json({message: `cannot find any logMachineTracking with ${id}` })
//         }
//         res.status(200).json({message: `deleted logMachineTracking with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     //to update a specific logMachineTracking details
//     app.put('/logMachineTracking/:id', async(req,res)=>{
//       try {
//         const {id} = req.params
//         const logMachineTracking = await LogMachineTracking.findByIdAndUpdate(id,req.body)
//         if(!logMachineTracking){
//           res.status(404).json({message: `cannot find any logMachineTracking with ${id}` })
//         }
//         res.status(200).json({message: `updated logMachineTracking with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })


//     // ------------------------------- CheckInNOut specific endpoints -----------------------------------

//     // add checkInNOut 
//     app.post('/addcheckInNOut',async(req,res)=>{
//       try {
//         const checkInNOut = await CheckInNOut.create(req.body)
//         res.status(200).json(checkInNOut)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//       // gets all checkInNOut information
//       app.get('/checkInNOut',async(req,res)=>{
//         try {
//           const checkInNOuts = await CheckInNOut.find({})
//           res.status(200).json(checkInNOuts)
//         } catch (error) {
//           console.log(error)
//           res.status(500).json({message: error.message})
//         }
//       })
  
//       //gets a specific checkInNOut based on _id
  
//       //null api --> db.collection.find({ column: { $type: 10 } })
  
//       // app.post('/checkInNOut/')
//       app.get('/checkInNOut/:id',async(req,res)=>{
//         try {
//           const {id} = req.params
//           const checkInNOuts = await CheckInNOut.findById(id)
//           res.status(200).json(checkInNOuts)
//         } catch (error) {
//           console.log(error)
//           res.status(500).json({message: error.message})
//         }
//       })
      
//       //to delete a specific checkInNOut
//     app.delete('checkInNOut/:id', async(req,res)=>{
//       try {
//         const {id} = req.params
//         const checkInNOut = await CheckInNOut.findByIdAndDelete(id)
//         if(!checkInNOut){
//           res.status(404).json({message: `cannot find any checkInNOut with ${id}` })
//         }
//         res.status(200).json({message: `deleted checkInNOut with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     //to update a specific checkInNOut details
//     app.put('/checkInNOut/:id', async(req,res)=>{
//       try {
//         const {id} = req.params
//         const checkInNOut = await CheckInNOut.findByIdAndUpdate(id,req.body)
//         if(!checkInNOut){
//           res.status(404).json({message: `cannot find any checkInNOut with ${id}` })
//         }
//         res.status(200).json({message: `updated checkInNOut with ${id}` })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

// //gets a specific checkInNOut based on _id

//     //null api --> db.collection.find({ column: { $type: 10 } })

//     //update checkin time
//     app.post('/updateCheckIn', async(req,res)=>{
//       try {
//         const userId = req.body.uId;
//         const location = req.body.location;
//         const checkInNOut = await CheckInNOut.create({userId : userId,  checkInTime : new Date() , location: location})
//         res.status(200).json(checkInNOut)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     app.get('/inOrOut/:uId', async(req,res)=>{
//       try {
//         const userId = req.params.uId
//         CheckInNOut.findOne( {userId : userId, checkOutTime : {  $exists: false  } } ).then( checkInNOutUser => {
//           if(!checkInNOutUser){
//             res.status(200).json({check : "In"})
//           }else{
//             res.status(200).json({check : "Out", location : checkInNOutUser.location})
//           }
//         })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     //updates only specific row of user wheere checkin in present and check out is not present
//     app.patch('/updateCheckOut/:uId', async(req,res)=>{
//       try {
//         const userId = req.params.uId
//         CheckInNOut.findOne( {userId : userId, checkOutTime : {  $exists: false  } } ).then( checkInNOutUser => {
//           // console.log(checkInNOutUser.checkInId)
//           checkInNOutUser.checkOutTime = new Date();
//           checkInNOutUser.save();
//           res.status(200).json({ success: true, message: 'Check out time updated successfully.' })
//         })
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//      // ------------------------------- MembershipPlan specific endpoints -----------------------------------

//     // add membership 
//     app.post('/addMembershipPlan',async(req,res)=>{
//       try {
//         const mambershipPlan = await MembershipPlan.create(req.body)
//         res.status(200).json(mambershipPlan)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//     // gets membership plan based on months provided in the url
//     app.get('/membershipPlan/:months',async(req,res)=>{
//       try {
//         const months = req.params.months
//         const membershipPlan = await MembershipPlan.findOne( { noOfMonths : months} )
//         if(!membershipPlan){
//           res.status(404).json( { message: "membership plan with given months not present"})
//         }
//         res.status(200).json(membershipPlan)
//       } catch (error) {
//         console.log(error)
//         res.status(500).json({message: error.message})
//       }
//     })

//   }
//   ).catch((error) => console.log("db connection error" + error));