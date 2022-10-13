const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    image: {
      type: String,
      default: 'default.jpg',
    },
    name: { 
      type: String,
      required: true
    },
    email: { 
      type: String,
      required: true
    },
    phone: { 
      type: Number 
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = model('User', UserSchema, 'users');