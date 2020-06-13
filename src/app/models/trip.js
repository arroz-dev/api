const mongoose = require('../../config/mongodb');

const TripSchema = mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

const Trip = mongoose.model('Trip', TripSchema);
module.exports = Trip;
