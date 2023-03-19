const { Router } = require('express');

const adminController = require('../../controllers/admin');
const authenticationController = require('../../controllers/admin/authentificationController');
const errorHandler = require('../../controllers/controllerErrorHandler');

const router = new Router();

router.get('/', authenticationController.isAuthenticated, errorHandler(adminController.getHome));
router.post('/signin', errorHandler(authenticationController.signin));
router.get('/signout', authenticationController.isAuthenticated, errorHandler(authenticationController.signout));
router.get('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.profil));
router.patch('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.updateProfil));

module.exports = router;
