const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, require: true, unique: true,},
  email: { type: String, required: true, unique: true,},
  password: { type: String, require: true },
  role: { type: String, enum: ["user", "admin"], default: "user",},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
