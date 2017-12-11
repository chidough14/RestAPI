const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  }

  // add geo location
});


const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;