require('dotenv').config();

const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./helper/logger');
const routes = require('./routes');

const app = express();

app.use(helmet());

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(async (error, req, res) => {
  logger.error(error);
  return res.status(500).json({ error: 'Houve um erro no servidor' });
});

app.listen(process.env.PORT || 3000, () =>
  logger.info(`API on port: ${process.env.PORT || 3000}`)
);
