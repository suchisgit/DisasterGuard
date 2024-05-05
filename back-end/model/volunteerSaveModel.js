const mongoose = require('mongoose');

const volunteerSaveSchema = mongoose.Schema(
    {
        volunteerEmail : { type : String, require : true},
        savesCount : {type : Number}
    },
    {
        timestamps : true
    }
)

const VolunteerSave = mongoose.model('VolunteerSave',volunteerSaveSchema);
module.exports = VolunteerSave;