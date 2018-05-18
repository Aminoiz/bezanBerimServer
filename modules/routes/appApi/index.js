const express = require('express');
const router = express.Router();

// middlewares
const apiAuth = require('./middleware/apiAuth');

// Controllers
const { controller } = config.path.app;
const AuthController = require(`${controller}/AuthController`);
const PostController = require(`${controller}/PostController`)

// authentication
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));

// Index
router.get('/' , apiAuth, PostController.index.bind(PostController));

// Post
router.post('/post/:id' , apiAuth, PostController.add.bind(PostController));

module.exports = router;
