const Controller = require('./Controller')
const Post = require(`${config.path.model}/post`);
const User = require(`${config.path.model}/user`);

module.exports = new class SampleController extends Controller {
    index(req , res) {
      User.findById(req.user._id, (err, user) => {
        Post.find({user_id:user.following}, (err, posts) => {
          if(err){
            res.json({
              data : err,
              success : false
            });
          }
          res.json({
              data : posts,
              success : true
          });
        });
      });
    }

    add(req, res) {
      req.checkBody('title' , 'وارد کردن فیلد تیتر الزامیست').notEmpty();
      req.checkBody('body' , 'وارد کردن فیلد متن الزامیست').notEmpty();

      this.escapeAndTrim(req , 'title body');

      if(this.showValidationErrors(req, res))
          return;

      this.model.Post({
          title : req.body.title,
          body : req.body.body,
          user_id: req.user._id
      }).save(err => {
          if(err) {
            res.json({
              data : err,
              success : false
            });
          }
          res.json({
              data : 'پست با موفقیت ثبت شد',
              success : true
          });
    });
  }

    come(req, res) {
      Post.findById(req.params.post_id, (err, post) => {
        if(err){
          res.send(err);
        }
        post.incomer.push(req.body.user);
        post.save(err => {
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
    });
  }
}
