const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
