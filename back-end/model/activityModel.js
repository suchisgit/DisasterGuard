const mongoose = require('mongoose');

const activitySchema = mongoose.Schema(
    {
        activityId : { type : String, require : true, unique : true},
        activityname : { type : String, require : true},
        activityDesc : { type : String }
    },
    {
        timestamps : true
    }
)

const Activity = mongoose.model('Activity',activitySchema);
module.exports = Activity;