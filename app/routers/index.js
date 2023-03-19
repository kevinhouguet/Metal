const { Router } = require('express');
const adminRouter = require('./admin');
const websiteRouter = require('./website');
const NotFoundError = require('../errors/NotFoundError');

const router = new Router();

router.use('/admin', adminRouter);
router.use('/', websiteRouter);

router.use((req, res, next) => {
  next(new NotFoundError());
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.httpCode).render(err.route, { err });
});

module.exports = router;
