const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    ddeAadhar:{
        type: Number,
        required: false,
        unique: true
    },
    ddeAddress:{
        type: String,
        required: false,
        unique: true
    },

    
  });
const UserModel = mongoose.model('DDEUser', UserSchema);
module.exports = UserModel;