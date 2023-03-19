const { Router } = require('express');

const adminController = require('../../controllers/admin');
const authenticationController = require('../../controllers/admin/authentificationController');

const router = new Router();

router.get('/', authenticationController.isAuthenticated, adminController.getHome);
router.post('/signin', authenticationController.signin);
router.get('/signout', authenticationController.signout);

module.exports = router;
