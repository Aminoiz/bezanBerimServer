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
      }).populate([
        { path: 'following' },
        { path: 'followers' }
      ]);
  }

  follow(req, res) {
    User.findById(req.body.follower, (err, user) => {
      if (err) {
        res.send(err);
      }
      user.followers.push(req.params.id);
      user.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'کاربر با موفقیت دنبال شد'});
      });
    });
  }

  unfollow(req, res) {
    User.findById(req.body.follower, (err, user) => {
      if (err) {
        res.send(err);
      }
      user.followers = user.followers.filter(item => item.toString() !== req.params.id)
      user.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'کاربر با موفقیت از لیست حذف شد' });
      });
    });
  }

}
