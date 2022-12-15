const mongoose = require("mongoose")

// Create Schema 

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
    
    
})

module.exports = mongoose.model("User", userSchema)