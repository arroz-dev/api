const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const MailController = require('./app/controllers/MailController');
const UserController = require('./app/controllers/UserController');
const authMid = require('./app/middlewares/auth');

routes.get('/', (req, res) => {
  res.json({ msg: 'API ON' });
});

routes.post('/user', UserController.store);
routes.post('/user', UserController.auth);

routes.use(authMid);

routes.post('/mail', MailController.store);

module.exports = routes;
