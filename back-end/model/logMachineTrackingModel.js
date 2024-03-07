const mongoose = require('mongoose');

//user id, machine name, start time, end time)

const logMachineTrackingSchema = mongoose.Schema(
    {
        userId : { type : String, require : true},
        machineName : { type : String, require : true},
        startTime : { type : Date, require : true},
        endTime : { type : Date, require : true}
    },
    {
        timestamps : true
    }
)

const LogMachineTracking = mongoose.model('LogMachineTracking',logMachineTrackingSchema);
module.exports = LogMachineTracking;