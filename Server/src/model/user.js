const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  passeword: { type: String, required: true },
  releaseDate: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;