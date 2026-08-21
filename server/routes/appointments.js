const express = require("express");
const Appointment = require("../models/Appointment");
const protect = require("../middleware/auth");

const router = express.Router();

// TASK 6.2: guard every route in this file with one line.
router.use(protect);

/**
 * TASK 6.3 - GET /api/appointments
 
 */
router.get("/", async (req, res) => {
  const appointments = await Appointment.find({
    owner:req.user.id,
  }).sort({createdAt:-1});
  res.json(appointments);
  
});

/**
 * TASK 6.4 - POST /api/appointments
 * owner comes from the token (req.user.id), never from req.body.
 */
router.post("/", async (req, res) => {
  const {doctor,reason,scheduledFor}= req.body;
  const appointment = await Appointment.create({
    doctor,
    reason,
    scheduledFor,
    owner:req.user.id,
  });
  res.status(201).json(appointment);
  
});

/**
 * TASK 6.5 - PUT /api/appointments/:id
 * Put BOTH _id and owner in the query so the database enforces ownership.
 * Nothing found -> 404 (never 403: a stranger must not learn the id exists).
 * Remember runValidators: true and new: true.
 */
router.put("/:id", async (req, res) => {
  const {doctor,reason,scheduledFor,status}=req.body;
  const appointment = await Appointment.findOneAndUpdate({
    _id:req.params.id,
    owner:req.user.id,
  },
  {
    doctor,
    reason,
    scheduledFor,
    status,
  },
  {
    new:true,
    runValidators:true,
  }
);
if(!appointment){
  return res.status(404).json({msg:"Appointment not found"});
}
res.json(appointment);
  
});

/**
 * TASK 6.6 - DELETE /api/appointments/:id
 * Same ownership filter, same 404.
 */
router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findOneAndDelete({
    _id:req.params.id,
    owner:req.user.id,
  });
  if(!appointment){
    return res.status(404).json({msg:"Appointment not found"});
  }
  res.json({msg:"Appointment deleted"});
  
});

module.exports = router;
