const express = require("express");
const { doctorsModel } = require("../Model/doctor.model");

const doctorRoutes = express.Router();

doctorRoutes.post("/add", async (req, res) => {
  try {
    const appointment = await doctorsModel(req.body);
    await appointment.save();
    res.status(200).send({ msg: "Appointment Fixed" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

doctorRoutes.get("/", async (req, res) => {
  const { specialization, sort } = req.query;
  console.log(specialization, sort);
  try {
    let doctors;
    if (specialization && sort) {
      doctors = await doctorsModel
        .find({ specialization })
        .sort({ date: sort === "asc" ? 1 : -1 });
    } else if (specialization) {
      doctors = await doctorsModel.find({ specialization });
    } else if (sort) {
      doctors = await doctorsModel
        .find()
        .sort({ date: sort === "asc" ? 1 : -1 });
    } else {
      doctors = await doctorsModel.find();
    }
    res.status(200).json({ doctors });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

doctorRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedappointment = await doctorsModel.findOneAndUpdate(
      { _id: id },
      req.body
    );
    if (updatedappointment) {
      res.status(200).send({ msg: "Appointment Updated" });
    } else {
      res.status(404).send({ msg: "Appointment Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

doctorRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedappointment = await doctorsModel.findOneAndDelete({ _id: id });
    if (updatedappointment) {
      res.status(200).send({ msg: "Appointment Deleted" });
    } else {
      res.status(404).send({ msg: "Appointment Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong" });
  }
});

module.exports = { doctorRoutes };
