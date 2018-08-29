'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Controller = require('./Controller')
const User = require(`${config.path.model}/user`);

module.exports = new class UserController extends Controller{

  show(req, res) {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      });
  }

  showUser(req, res) {
    User.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  findUser(req, res) {
    User.find({'username': {'$regex': req.params.username, '$options': 'i'}} , (err, users) => {
      if(err){
        res.json({
          data : err,
          success : false
        });
      }
      res.json({
          data : users,
          success : true
      });
    });
  }

  follow(req, res) {
    User.findById(req.body.follower, (err, followedUser) => {
      if (err) {
        res.send(err);
      }
      User.findById(req.user._id, (err, user) => {
        if (err) {
          res.send(err);
        }
        if(!followedUser.followers.includes(req.user._id)){
          followedUser.followers.push(req.user._id);
          followedUser.save(err => {
            if (err) {
              res.json({
                data : err,
                success : false
              });
            }
            if(!user.following.includes(req.body.follower)){
              user.following.push(req.body.follower);
              user.save(err => {
                if (err) {
                  res.json({
                    data : err,
                    success : false
                  });
                }
                res.json({
                    success : true
                });
              });
            } else {
              res.json({
                  success : true
              });
            }
          });
        } else {
          res.json({
              success : true
          });
        }
      });
    });
  }

  unfollow(req, res) {
    User.findById(req.body.follower, (err, unfollowedUser) => {
      if (err) {
        res.send(err);
      }
      User.findById(req.user._id, (err, user) => {
        if (err) {
          res.send(err);
        }
        unfollowedUser.followers = followerUser.followers.filter(item => item.toString() !== req.user._id)
        unfollowedUser.save(err => {
          if (err) {
            res.send(err);
          }
          user.following = user.following.filter(item => item.toString() !== req.body.follower)
          user.save(err => {
            if (err) {
              res.send(err);
            }
            res.json(user);
          });
        });
      });
    });
  }
}
