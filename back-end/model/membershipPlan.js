const mongoose = require('mongoose');

//(userid, check in id, check in time, checkout time)
const membershipPlanSchema = mongoose.Schema(
    {
        noOfMonths : { type : Number, require : true},
        membershipPrice : { type : Number, require : true},
        description : { type : String }
    },
    {
        timestamps : true
    }
)

const MembershipPlan = mongoose.model('membershipPlan',membershipPlanSchema);
module.exports = MembershipPlan;