const express =require("express")
const mongoose=require("mongoose");
const cors = require("cors");
const routes = require("./route/bookingRoute");
const router=require("./route/eventRoute")
require("dotenv").config();



const app=express();

app.use(express.json())
app.use(cors());
app.use("/api/events",router)
app.use("/api/booking",routes)
app.use('/uploads',express.static('uploads'))
mongoose.connect(process.env.MOGODB_URL).then(()=>{
    console.log("mongoose is connected")

    app.listen(process.env.PORT,()=>{
        console.log("Running port is :"+process.env.PORT)
    })
})