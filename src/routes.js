const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const MailController = require('./app/controllers/MailController');
const UserController = require('./app/controllers/UserController');
const TripController = require('./app/controllers/TripController');
const authMid = require('./app/middlewares/auth');

routes.get('/', (req, res) => {
  res.json({ msg: 'Mail Service OK' });
});

routes.post('/user', UserController.store);
routes.post('/login', UserController.auth);

routes.use(authMid);

routes.get('/user', UserController.index);

routes.post('/mail', MailController.store);

routes.post('/trip', TripController.store);
routes.get('/trip', TripController.index);
routes.get('/trip/:id', TripController.show);

routes.put('/user', UserController.update);

module.exports = routes;
