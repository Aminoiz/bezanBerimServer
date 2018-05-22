const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const PostSchema = new Schema({
    user_id : { type : Schema.Types.ObjectId , ref : 'User' },
    title : { type : String , required : true },
    categories: { type : Array , default : [] }, // [id, id, ...] categories_list.txt line
    body: { type : String , required : true },
    photos: { type : Array , default : [] },
    type: { type : Number , default : 0 }, //0 normal, 1 bussiness, 2 archive, 3 suggest
    incomer : { type : Array , default : [] },  // {count:0, [id, id, ...]}
    vote: { type : Object , default : {expire: null, response: null} }, // {expire, response, [{text, count, [id, id, ...]}, item:{text, count, id, id}, ...]}
    rate: { type : Object , default : {count:0, sum:0} }, // {count, sum, [{count, id}, {count, id}, ...]}
    color: { type : String , default : "black" },
    latlng: { type : String , default : null },
    city : { type : Number , default : -1 } // citis_list.txt line
});

PostSchema.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Post' , PostSchema);
