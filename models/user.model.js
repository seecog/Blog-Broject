var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        minlength : 3,
        trim : true
    },
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 25,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        trim : true
    },
    dob : {
        type : Date,
        required : true,
        default : new Date()
    }
})

module.exports = mongoose.model("User",userSchema);