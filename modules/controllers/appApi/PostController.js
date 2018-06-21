const Controller = require('./Controller')
const Post = require(`${config.path.model}/post`);
const User = require(`${config.path.model}/user`);

module.exports = new class SampleController extends Controller {
    index(req , res) {
      User.findById(req.user._id, (err, user) => {
        Post.find({user_id:user.following})
        .populate('User')
        .exec()
        .then((err, posts) => {
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
      req.checkBody('body' , 'وارد کردن فیلد متن الزامیست').notEmpty();
      this.escapeAndTrim(req , 'body');
      if(this.showValidationErrors(req, res))
          return;

      let postId;

      let newPost = new Post();
      newPost.body = req.body.body;
      newPost.user_id = req.user._id;
      newPost.save(err => {
        if(err) {
          res.json({
            data : err,
            success : false
          })};
        postId = newPost._id;
        });

      User.findById(req.user_id, (err, user) => {
        if(err) {
          res.json({
            data : err,
            success : false
          })};
        user.posts.push(postId);
        user.save(err => {
          if (err) {
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
