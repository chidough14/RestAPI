const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const GeoSchema = new Schema({
  type: {
      type: String,
      default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

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
  },
  geometry: GeoSchema
});


const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;