const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    type : { type : Number , required : true}, //0 user, 1 post, 2 comment
    reporter_id : { type : Schema.Types.ObjectId, ref : 'User'},
    content_id : { type : Schema.Types.ObjectId, ref : 'User'}, // Should be dynamic of Posts and Users: http://mongoosejs.com/docs/populate.html#dynamic-ref
});

module.exports = mongoose.model('Report' , ReportSchema);