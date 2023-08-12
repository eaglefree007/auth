const mongoose = require("mongoose")
const uuid = require("uuid")
const employee = mongoose.Schema({

    // id: { type: String, required: true, default: uuid.v4() },
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    about: { type: String },
    // image: { type: String, required: true },
    address: {type:String,required:true},
    city: {type:String,required:true},
    state: {type:String,required:true},
    country: {type:String,required:true},
    zip: {type:Number,required:true},
    password: {type:String,required:true},
    role: {type:Number,require:true},
    status: { type: Number, required: true },
    isReffered: {type:Number,required:true},
    createdDate: {type:Number,required:true},
    updatedDate: {type:Number,required:true},
    
})

module.exports = mongoose.model("user", employee)
