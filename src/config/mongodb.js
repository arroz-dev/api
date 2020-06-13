const mongoose = require('mongoose');
const logger = require('../helper/logger');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose default connection disconnected');
});

module.exports = mongoose;
