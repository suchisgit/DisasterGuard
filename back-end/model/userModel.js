const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userId : { type : String, require : true, unique : true},
        role : { type : String, default : 'Non Member'},
        name : { type : String, require : true},
        password : { type : String, require : true},
        email : { type : String, require : true},
        phoneNumber : { type : String, minlength : 10, maxlength : 10},
        address : { type : String},
        age : { type : Number},
        weight : { type : Number},
        height : { type : Number},
        membershipStartDate : { type : Date},
        membershipEndDate : { type : Date}
    },
    {
        timestamps : true
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;