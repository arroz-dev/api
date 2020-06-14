const mongoose = require('../../config/mongodb');

const TripSchema = mongoose.Schema(
  {
    userId: String,
    origin: String,
    destination: String,
    latitude: String,
    longitude: String,
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
