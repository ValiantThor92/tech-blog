const router = require('express').Router();
const userRouter = require('./userRoutes');
const postRouter = require('./postRoutes');
const commentRouter = require('./commentRoutes');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;