const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const PangolinSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Veuillez fournir une adresse email valide"],
  },
  password: {
    type: String,
    required: true,
    set: (value) => bcrypt.hashSync(value, 10),
  },
  role: {
    type: String,
    enum: ["Guerrier", "Alchimiste", "Sorcier", "Espions", "Enchanteur"],
    default: "Guerrier",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pangolin",
    },
  ],
});

module.exports = mongoose.model("Pangolin", PangolinSchema);
