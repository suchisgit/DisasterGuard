const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
        adminId : { type : String, require : true, unique : true},
        name : { type : String, require : true},
        email : { type : String, require : true},
        password : { type : String, require : true}
    },
    {
        timestamps : true
    }
)

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;