const mongoose = require('mongoose');

const volunteerSaveSchema = mongoose.Schema(
    {
        volunteerEmail : { type : String, require : true, unique : true},
        incidentId : { type: mongoose.Schema.Types.ObjectId, ref: 'DisasterIncident'},
        savesCount : {type : Number}
    },
    {
        timestamps : true
    }
)

const VolunteerSave = mongoose.model('VolunteerSave',volunteerSaveSchema);
module.exports = VolunteerSave;