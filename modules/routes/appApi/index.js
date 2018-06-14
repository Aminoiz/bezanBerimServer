const express = require('express');
const router = express.Router();

// middlewares
const apiAuth = require('./middleware/apiAuth');

// Controllers
const { controller } = config.path.app;
const AuthController = require(`${controller}/AuthController`);
const PostController = require(`${controller}/PostController`);
const UserController = require(`${controller}/UserController`);

// authentication
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));

// Index
router.get('/' , apiAuth, PostController.index.bind(PostController));

// Post
router.post('/post' , apiAuth, PostController.add.bind(PostController));

// Follow
router.post('/follow', apiAuth, UserController.follow.bind(UserController));
// Unfollow
router.post('/unfollow', apiAuth, UserController.unfollow.bind(UserController));

// Dashboard/Profile
router.get('/dashboard', apiAuth, UserController.show.bind(UserController));

// Coming
router.post('/post/coming/:post_id', apiAuth, PostController.come.bind(PostController));


module.exports = router;
