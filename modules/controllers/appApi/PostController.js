const Controller = require('./Controller')
const Post = require(`${config.path.model}/post`);
const User = require(`${config.path.model}/user`);

module.exports = new class SampleController extends Controller {
    index(req , res) {
      User.findById(req.params.id, (err, user) => {
        Post.find({user_id:user.following}, (err, posts) => {
          if(err){
            res.send(err);
          }
          res.json(posts);
        });
      });
    }

    add(req, res) {
      this.model.Post({
          title : req.body.title,
          body : req.body.body,
          user_id: req.params.id
      }).save(err => {
          if(err) {
            res.send(err);
          }
          res.json({
              data : 'پست با موفقیت ثبت شد',
              success : true
          });
    });
  }

}
