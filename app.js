const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
const projects = require("./routes/projects");

app.use("/projects", projects);

//starting server

mongoose.connect(
  process.env.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    try {
      console.log("[*] Successfully connected to the database.");
    } catch (err) {
      res.send(err);
    }
  }
);

app.listen(process.env.PORT || 3000);
