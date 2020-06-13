require('dotenv').config();

const express = require('express');
const Youch = require('youch');
require('express-async-errors');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./helper/logger');
const routes = require('./routes');

const app = express();

app.use(helmet());

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.use(async (error, req, res) => {
  if (error) {
    const errors = await new Youch(error, req).toJSON();
    logger.error(error);
    return res.status(500).json({ errors });
  }
});

app.listen(process.env.PORT || 3000, () =>
  logger.info(`API on port: ${process.env.PORT || 3000}`)
);
