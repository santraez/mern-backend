const mongoose = require('mongoose');
require('dotenv').config();

const { MONGOHOST, MONGOPASSWORD, MONGOPORT, MONGOUSER } = process.env;
const MONGODB_URI = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;

const connect = async() => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DATABASE IS CONNECTED');
  } catch (err) {
    console.log('DATABASE IS NOT CONNECTED ' + err);
  };
};

module.exports = connect;