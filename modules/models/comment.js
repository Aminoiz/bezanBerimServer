const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const CommentSchema = new Schema({
    type : { type : Number , default : 0}, //0 comment, 1 advise
    content_id : { type : Schema.Types.ObjectId, ref : 'Post'}, // Should be dynamic of Posts and Users: http://mongoosejs.com/docs/populate.html#dynamic-ref
    commenter_id : { type : Schema.Types.ObjectId, ref : 'User'},
    reply_id : { type : Schema.Types.ObjectId, ref : 'Comment'},
    body : { type : String , required : true},
    like : { type : Object , default : {count:[0,0]} }// {count:[0,0], [{id, type}, {id, type}]}}); type: 1 like, -1 dislike
})

CommentSchema.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Comment' , CommentSchema);