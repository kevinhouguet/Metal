const { Router } = require('express');

const adminController = require('../../controllers/admin');
const authenticationController = require('../../controllers/admin/authentificationController');
const errorHandler = require('../../controllers/controllerErrorHandler');
const metalController = require('../../controllers/admin/metalController');
const itemController = require('../../controllers/admin/itemController');

const router = new Router();

router.get('/', authenticationController.isAuthenticated, errorHandler(adminController.getHome));
router.post('/signin', errorHandler(authenticationController.signin));
router.get('/signout', authenticationController.isAuthenticated, errorHandler(authenticationController.signout));
router.get('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.profil));
router.patch('/profil', authenticationController.isAuthenticated, errorHandler(authenticationController.updateProfil));

router.get('/addMetal', authenticationController.isAuthenticated, errorHandler(metalController.addMetalForm));
router.post('/addMetal', authenticationController.isAuthenticated, errorHandler(metalController.addMetal));

router.get('/updateMetal', authenticationController.isAuthenticated, errorHandler(metalController.updateMetalForm));
router.get('/updateMetal/:id', authenticationController.isAuthenticated, errorHandler(metalController.updateMetalForm));
router.post('/updateMetal', authenticationController.isAuthenticated, errorHandler(metalController.updateMetal));

router.get('/delMetal', authenticationController.isAuthenticated, errorHandler(metalController.delMetalForm));
router.get('/delMetal/:id', authenticationController.isAuthenticated, errorHandler(metalController.delMetalForm));
router.post('/delMetal', authenticationController.isAuthenticated, errorHandler(metalController.delMetal));

router.get('/addItem', authenticationController.isAuthenticated, errorHandler(itemController.addItemForm));
router.post('/addItem', authenticationController.isAuthenticated, errorHandler(itemController.addItem));

router.get('/updateItem', authenticationController.isAuthenticated, errorHandler(itemController.updateItemForm));
router.get('/updateItem/:id', authenticationController.isAuthenticated, errorHandler(itemController.updateItemForm));
router.post('/updateItem', authenticationController.isAuthenticated, errorHandler(itemController.updateItem));

module.exports = router;
