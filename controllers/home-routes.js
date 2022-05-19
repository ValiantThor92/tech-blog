const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { 
          model: User, 
          attributes: ['first_name', 'last_name']
        },
        { model: Comment, 
          attributes: ['content', 'date_created'],
          as: 'comments' 
        }
      ]
    })
    const posts = postData.map(post => post.get(
      {
        plain: true
      }));
    console.log(posts);
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
      res.status(500).json(err);
  }
});
// get single post by id
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { 
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    })
    const post = postData.get(
      {
        plain: true
      }
    );
    console.log(post);
    res.render('post',
      {
        ...post,
        logged_in: req.session.logged_in
      }
    )
  } catch (err) {
    res.status(500).json(err);
  }
})
// get single post comments
router.get('/post/:id/comment', withAuth, async (req, res) => {})
// get dashboard data
router.get('/dashboard', withAuth, async (req, res) => {})
// get login data and redirect to the dash
router.get('/login', (req, res) => {})
// get signup data
router.get('/signup', (req, res) => {})