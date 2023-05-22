const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PangolinSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
