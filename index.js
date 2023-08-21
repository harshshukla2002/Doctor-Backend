const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./Routes/user.routes");
const { doctorRoutes } = require("./Routes/doctor.route");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/users", userRouter);
server.use("/doctors", doctorRoutes);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running in ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
