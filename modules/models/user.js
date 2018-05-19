const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email : { type : String , required : true},
    password: { type : String , required : true},
    phone: { type : Number , required : true},
    username: { type : String , required : true},
    birth: { type : Date , required : false},
    gender: { type : Number , default : -1}, //-1 undefind, 0 male, 1 female, 2 etc
    name: { type : String , required : true},
    following: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    type: { type : Number , default : 0}, //0 private, 1 bussiness, 2 verified, 3 deactived, 4 banned, 5 deleted
    profile_img: { type : String , default : "" }, // default will be default profile photo
    bio: { type : String , default : null},
    //fav: { type : Number , default : {count:0} }, // {count:0, [id, id, ...]}
    fav: { type : Number , default : 0 }, // Edited
    categories: { type : Number , default : -1}, // categories_list.txt line
    selected_city: { type : Number , default : -1} // citis_list.txt line
});

UserSchema.plugin(timestamps,  {
    createdAt: 'created_at',
    updatedAt: 'last_login'
});

UserSchema.pre('save' , function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('User' , UserSchema);
