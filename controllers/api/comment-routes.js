const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');
const date = new Date();

router.get('/', (req, res) => {})


router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      date_created: date.toDateString(),
      user_id: req.session.user_id
    })
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!commentData) {
      res.status(400).json({ message: 'No comment found'});
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;