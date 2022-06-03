const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {})

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    })
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, 
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!postData) {
      res.status(400).json({ message: 'No post found'});
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!postData) {
      res.status(400).json({ message: 'No post found'});
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;