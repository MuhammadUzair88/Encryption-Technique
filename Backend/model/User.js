
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    password: String, 
    shift: Number,
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports=User;