// Model
const Comment = require(`${config.path.model}/comment`);
const Notification = require(`${config.path.model}/notification`);
const Post = require(`${config.path.model}/post`);
const Report = require(`${config.path.model}/report`);
const User = require(`${config.path.model}/user`);

module.exports = class Controller {
    constructor() {
        this.model = { Comment, Notification, Post, Report, User }
    }

    showValidationErrors(req , res , callback) {
        let errors = req.validationErrors();
        if(errors) {
            res.status(422).json({
                message : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg
                    }
                }),
                success : false
            });
            return true;
        }
        return false
    }


    escapeAndTrim(req , items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();            
        });
    }
}