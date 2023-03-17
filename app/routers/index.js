const { Router } = require('express');
const adminRouter = require('../routers/admin');
const websiteRouter = require('../routers/website');

const router = new Router();

router.use('/admin', adminRouter);
router.use('/', websiteRouter);

module.exports = router;
