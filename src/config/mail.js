const nodemailer = require('nodemailer');
const nodemailerhbs = require('nodemailer-express-handlebars');
const expresshbs = require('express-handlebars');
const { resolve } = require('path');

const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transport.use(
  'compile',
  nodemailerhbs({
    viewEngine: expresshbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs',
    }),
    viewPath,
    extName: '.hbs',
  })
);

module.exports = transport;
