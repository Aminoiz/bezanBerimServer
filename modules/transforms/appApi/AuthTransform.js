const Transform = require('./Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {

    transform(item) {
        return {
            'name' : item.name,
            'email' : item.email,
            'token' : this.withToken(item)
        }
    }

    withToken(item) {
        if(item.token) 
            return { token : item.token}
        let token = jwt.sign({ user_id : item._id } , config.secret , {expiresIn :  '110h'});
        return token
    }

}