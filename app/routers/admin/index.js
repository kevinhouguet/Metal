const { Router } = require('express');

const adminController = require('../../controllers/admin');
const authenticationController = require('../../controllers/admin/authentificationController');
const errorHandler = require('../../controllers/controllerErrorHandler');
const metalController = require('../../controllers/admin/metalController');

const router = new Router();

router.get('/', authenticationController.isAuthenticated, errorHandler(adminController.getHome));
router.post('/signin', errorHandler(authenticationController.signin));
router.get('/signout', authenticationController.isAuthenticated, errorHandler(authenticationController.signout));
router.get('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.profil));
router.patch('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.updateProfil));

router.get('/addMetal', authenticationController.isAuthenticated, errorHandler(metalController.addMetalForm));
router.post('/addMetal', authenticationController.isAuthenticated, errorHandler(metalController.addMetal));

module.exports = router;
