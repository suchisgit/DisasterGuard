const mongoose = require('mongoose');

//(userid, check in id, check in time, checkout time)
const checkInNOutSchema = mongoose.Schema(
    {
        userId : { type : String, require : true},
        checkInId : { type : String},
        checkInTime : { type : Date},
        checkOutTime : { type : Date}
    },
    {
        timestamps : true
    }
)

const CheckInNOut = mongoose.model('CheckInNOut',checkInNOutSchema);
module.exports = CheckInNOut;