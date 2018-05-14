const express = require('express');
const router = express.Router();

// middlewares 
const apiAuth = require('./middleware/apiAuth');

// Controllers 
const { controller } = config.path.app;
const AuthController = require(`${controller}/AuthController`);
const SampleController = require(`${controller}/SampleController`)

// authentication
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));

// Dashboard
router.get('/' , apiAuth, SampleController.index.bind(SampleController));

module.exports = router;