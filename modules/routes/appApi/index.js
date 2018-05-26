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
router.get('/:id' , apiAuth, PostController.index.bind(PostController));

// Post
router.post('/post/:id' , apiAuth, PostController.add.bind(PostController));

// Follow
router.post('/follow/:id', apiAuth, UserController.follow.bind(UserController));
// Unfollow
router.post('/unfollow/:id', apiAuth, UserController.unfollow.bind(UserController));

// Dashboard
router.post('/user/:id', apiAuth, UserController.show.bind(UserController));

// Coming
router.post('/post/coming/:id', apiAuth, PostController.come.bind(PostController));


module.exports = router;
