const { Router } = require('express');

const adminController = require('../../controllers/admin');
const authenticationController = require('../../controllers/admin/authentificationController');
const errorHandler = require('../../controllers/controllerErrorHandler');

const router = new Router();

router.get('/', authenticationController.isAuthenticated, errorHandler(adminController.getHome));
router.post('/signin', errorHandler(authenticationController.signin));
router.get('/signout', errorHandler(authenticationController.signout));

module.exports = router;
