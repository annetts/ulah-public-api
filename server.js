require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const talentRoutes = require("./routes/talentRoutes");

const db_url = process.env.DATABASE_URL;
const user = process.env.DATABASE_USER;
const pass = process.env.PASS;
const port = process.env.PORT;

const Connect = async () => {
  try {
    const conn = await mongoose.connect(db_url, {
      user: user,
      pass: pass,
    });
    //console.log(conn.connection.on('connection') );
    console.log("db readyState => ", mongoose.connection.readyState);

    //const db = conn.db("ulah");
    conn.connection
      .on("open", () => log.green("DATABASE STATE", "Connection Open"))
      .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
      .on("error", (error) => log.red("DATABASE STATE", error));
  } catch (error) {
    console.log(error);
  }
};

Connect();

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("uploads"));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("A simple Node App is " + "running on this server");
  res.end();
});

const PORT = port || 7000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use("/talent", talentRoutes);
