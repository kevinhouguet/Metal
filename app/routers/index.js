const { Router } = require('express');
const adminRouter = require('./admin');
const websiteRouter = require('./website');

const router = new Router();

router.use('/admin', adminRouter);
router.use('/', websiteRouter);

router.use((req, res, next) => {
  next(new Error('not found'));
});

router.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Error');
});

module.exports = router;
