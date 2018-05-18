const mongoose = require('mongoose'),
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const FollowSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

FollowSchema.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = mongoose.model('Follow', FollowSchema);
