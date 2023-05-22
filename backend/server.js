const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");

const PangolinSchema = require("./models/pangolin");
const pangolinRouter = require("./routes/pangolins");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/pangolinDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());

const router = express.Router();
app.get("/api/pangolins", (req, res) => {
  PangolinSchema.find({})
    .then((pangolins) => {
      res.status(200).json(pangolins);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.use("/api/pangolins", pangolinRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));
