const mongoose = require('mongoose');

const incidentVariableSchema = mongoose.Schema(
    {
        incidentCount : {type : Number}
    },
    {
        timestamps : true
    }
)

const IncidentVariable = mongoose.model('IncidentVariable',incidentVariableSchema);
module.exports = IncidentVariable;