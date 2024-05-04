const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email : { type : String, require : true , unique : true},
        role : { type : String, default : 'user'},
        name : { type : String, require : true},
        password : { type : String, require : true},
        phoneNumber : { type : String, minlength : 10, maxlength : 13},
        address : { type : String},
        latitude : {type : String},
        longitude : {type : String} 
    },
    {
        timestamps : true
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;