const { Router } = require('express');
const adminRouter = require('./admin');
const websiteRouter = require('./website');

const router = new Router();

router.use('/admin', adminRouter);
router.use('/', websiteRouter);

module.exports = router;
