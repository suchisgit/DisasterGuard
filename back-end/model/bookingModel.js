const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema(
    {
        userId : { type : String, require : true},
        classId : { type : String, require : true},
        status : { type : String, require : true}
    },
    {
        timestamps : true
    }
)

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;