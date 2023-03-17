const { Router } = require('express');

const adminController = require('../../controllers/admin');

const router = new Router();

router.get('/admin', adminController.getHome);

module.exports = router;
