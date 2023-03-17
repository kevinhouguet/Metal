const { Router } = require('express');
const websiteController = require('../../controllers/website');

const router = new Router();

router.get('/', websiteController.getHome);

module.exports = router;
