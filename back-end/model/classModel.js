const mongoose = require('mongoose');

const classSchema = mongoose.Schema(
    {
        activityId : { type : String, require : true},
        classId : { type : Number },
        location : { type : String, require : true},
        startTime : { type : Date },
        endTime : { type : Date },
        capacity : { type : Number },
        instructor : { type : String }
    },
    {
        timestamps : true
    }
)

const Class = mongoose.model('Classe',classSchema);
module.exports = Class;