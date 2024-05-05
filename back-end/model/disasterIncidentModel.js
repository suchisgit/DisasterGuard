const mongoose = require('mongoose');

const disasterIncidentSchema = mongoose.Schema(
    {
        email : { type : String, require : true},
        userPhoneNumber : {type : String},
        voicemessage : {type : String},
        latitude : {type : String},
        longitude : {type : String}
    },
    {
        timestamps : true
    }
)

const DisasterIncident = mongoose.model('DisasterIncident',disasterIncidentSchema);
module.exports = DisasterIncident;