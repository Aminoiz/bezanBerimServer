'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Controller = require('./Controller')
const User = require(`${config.path.model}/user`);

module.exports = new class UserController extends Controller{

  show(req, res) {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      });
  }

  follow(req, res) {
    User.findById(req.body.follower, (err, followerUser) => {
      if (err) {
        res.send(err);
      }
      User.findById(req.params.id, (err,followingUser) => {
        if (err) {
          res.send(err);
        }
        followerUser.following.push(req.params.id);
        followerUser.save(err => {
          if (err) {
            res.send(err);
          }
          followingUser.followers.push(req.body.follower);
          followingUser.save(err => {
            if (err) {
              res.send(err);
            }
            res.json(followerUser);
          });
        });
      });
    });
  }

  unfollow(req, res) {
    User.findById(req.body.follower, (err, followerUser) => {
      if (err) {
        res.send(err);
      }
      User.findById(req.params.id, (err,followingUser) => {
        if (err) {
          res.send(err);
        }
        followerUser.following = followerUser.followers.filter(item => item.toString() !== req.params.id)
        followerUser.save(err => {
          if (err) {
            res.send(err);
          }
          followingUser.followers = followingUser.followers.filter(item => item.toString() !== req.body.follower)
          followingUser.save(err => {
            if (err) {
              res.send(err);
            }
            res.json(followerUser);
          });
        });
      });
    });
  }
}
