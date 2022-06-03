const router = require('express').Router();
const userRouter = require('./user-routes');
const postRouter = require('./post-routes');
const commentRouter = require('./comment-routes');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;