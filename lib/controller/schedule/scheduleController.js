const { default: mongoose } = require('mongoose');
const Schedule = require('../../models/Schedule');

const getAllSchedule = async(req, res) => {
   try{

      const scheduleList = await Schedule.find();


      res.status(200).json({success: true, data: scheduleList});
      // res.status(400).json({message:"Testing error"});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const getSchedule = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const foundSchedule = await Schedule.findOne({_id: mongoose.Types.ObjectId(id)}).exec();

      if(!foundSchedule) return res.status(404).json({success: false, message: "Schedule does not exist."});

      res.status(200).json({success: true, data: foundSchedule});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const addNewSchedule = async(req,res) => {
   const {Id, Subject, Location, StartTime, EndTime, CategoryColor} = req.body;
   if(!Subject || !StartTime || !EndTime || !Id) return res.status(400).json({success: false, message: `Please provide all requirements!`});

   try{

      const schedule = await new Schedule({
         Id: Id,
         Subject: Subject,
         Location: Location,
         StartTime: new Date(StartTime),
         EndTime: new Date(EndTime),
         CategoryColor: CategoryColor
      }).save();

      res.status(200).json({success: true, data: schedule})

   } catch(err){
      res.status(500).json({message: err.message});
   }
}

const updateSchedule = async(req,res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try {
      const foundSchedule = await Schedule.findOne({Id: id}).exec();

      if(!foundSchedule) return res.status(404).json({success: false, message: "Schedule does not exist."});

      if(req.body?.Id) foundSchedule.Id = req.body.Id
      if(req.body?.Subject) foundSchedule.Subject = req.body.Subject;
      if(req.body?.Location) foundSchedule.Location = req.body.Location;
      if(req.body?.StartTime) foundSchedule.StartTime = req.body.StartTime;
      if(req.body?.EndTime) foundSchedule.EndTime = req.body.EndTime;
      if(req.body?.CategoryColor) foundSchedule.CategoryColor = req.body.CategoryColor;

      foundSchedule.save();

      res.status(200).json({success: true, data: foundSchedule});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

const deleteSchedule = async(req, res) => {
   const id = req.params?.id
   if(!id) res.status(400).json({message: "ID parameter is required"});

   try{
      const result = await Schedule.deleteOne({Id: id}).exec();

      if(!result) return res.status(400).json({success: false, message: "Cannot delete schedule"});

      res.status(200).json({success:true, data: result});
   } catch(err) {
      res.status(500).json({message: err.message});
   }
}

module.exports = {
   getAllSchedule,
   getSchedule,
   addNewSchedule,
   updateSchedule,
   deleteSchedule
}