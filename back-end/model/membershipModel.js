const mongoose = require('mongoose')

const membershipSchema = mongoose.Schema(
    {
        mId :{
            type : String,
            require : true
        },
        uId :{
            type : String,
            require : true
        }
    },
    {
        timestamps : true
    }
    )

const Membership = mongoose.model('Membership', membershipSchema) ; // this membership inside model is the collection name which will automatically get appended with 's'

module.exports = Membership;