const tripModel = require('../models/trip');

class TripController {
  async store(req, res) {
    const trip = await tripModel.create(req.body);
    return res.status(201).json(trip);
  }

  async show(req, res) {
    const trips = await tripModel.find();
    return res.stauts(200).json(trips);
  }

  async index(req, res) {
    const { id } = req.params;
    const trip = await tripModel.findById(id);
    return res.status(200).json(trip);
  }
}

module.exports = new TripController();
