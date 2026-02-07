const mongoose =require('mongoose')
const eventSchema = new mongoose.Schema({
    title:{type:String , required:true},
    location:{type:String , required:true},
    price:{type:Number},
     seats:{type:Number },
    availableSeats:{type:Number },
 description:{type:String , required:true},
    date:{type:String , required:true},
    image:{type:String },

},{timestamps:true});
const eventModel = mongoose.model("Event" ,eventSchema)
module.exports= eventModel 