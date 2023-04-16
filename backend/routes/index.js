const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const authRouter = require('./auth');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.all('*', (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

module.exports = router;
