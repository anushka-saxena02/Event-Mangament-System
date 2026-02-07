const fs = require('fs')
const path =require('path');
const eventModel = require('../model/eventModel');

const createEvent =async(req ,res)=>{
    try{
     const {title,location,price ,seats,  description ,date}=req.body;
     const imageName =req.file? req.file.filename:"";

     if(!title||!location||!price||!seats || !description||!date){
        return res.status(400).json({success:false,message:"Please fill all required"})
     }
     const newEvent=await eventModel.create({
        title,location,price,seats,description, availableSeats:seats,
        date,image:imageName
     });
     res.status(201).json({success:true,data:newEvent})
    }catch(err){
      res.status(400).json({success:false ,message:err.message})
    }
}

const getAllEvents =async (req,res)=>{
    try{
    const events = await eventModel.find().sort({createdAt:-1})
    res.status(200).json({success:true ,data:events});

    }catch(err){
    res.status(500).json({suceess :false,error:err.message})
    }
}
const updateEvents =async(req,res)=>{
    try{
    let event= await eventModel.findById(req.params.id);
    if(!event){
        return res.status(404).json({success:false , messages:"Event is not exist"})
    }
            const updateData=req.body 
        if(req.file){
            if(event.image){
                const oldPath=path.join(__dirname,'../uplods',event.image)
                if(fs.existsSync(oldPath))
                    fs.unlinkSync(oldPath)
            }
            updateData.image=req.file.filename;
        }
        event=await eventModel.findByIdAndUpdate(req.params.id,updateData,{new:true})
        res.status(200).json({success:true,message:"Event is updated",data:event})

    }catch(err){
     res.status(400).json({uccess:false,message:err.message})
    }
}
 const deleteEvent = async(req,res)=>{
    try{
      const event = await eventModel.findById(req.params.id);
          if(!event){
        return res.status(404).json({sucess:false , messages:"Event is not exist"})
    }
    if(event.image){
        const imagePath =path.join(__dirname,'../uploads/',event.image);
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }
    }
    await eventModel.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true,message:"Event is deleted"})

    }catch(err){
   res.status(500).json({success:false,message:err.message})
    }
 };

const getSingleEvent = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, data: event });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



 module.exports= {createEvent,getAllEvents,updateEvents,deleteEvent,getSingleEvent};