const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name : { type : String , required : true},
    grade : { type : Schema.Types.ObjectId, ref : 'Grade'}
});

module.exports = mongoose.model('Lesson' , LessonSchema);