const Controller = require('./Controller')
const AuthTransform = require(`${config.path.app.transform}/AuthTransform`);
const bcrypt = require('bcrypt');

module.exports = new class CourseController extends Controller {

    login(req , res) {
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('email' , 'ایمیل وارد شده صحیح نمی باشد.').isEmail();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        this.escapeAndTrim(req , 'email password');

        if(this.showValidationErrors(req, res))
            return;

        this.model.User.findOne({ email : req.body.email } , (err , user) => {
            if(err) throw err;
            if(user == null)
                return res.status(422).json({
                    data : 'اطلاعات وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {

                if(! status)
                    return res.status(422).json({
                        success : false,
                        data : 'پسورد وارد شده صحیح نمی باشد'
                    })

                return res.json({
                    data : new AuthTransform().transform(user),
                    success : true
                });
            })
        })
    }

    register(req , res) {
        req.checkBody('name' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        req.checkBody('phone' , ' کردن فیلد تلفن الزامیست').notEmpty();
        req.checkBody('username' , 'وارد کردن فیلد یوزرنیم الزامیست').notEmpty();

        if(this.showValidationErrors(req, res))
            return;

        this.model.User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            username: req.body.username,
            phone: req.body.phone
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'ایمیل نمی تواند تکراری باشد',
                        success : false
                    })
                } else {
                    throw err;
                }
            }

            return res.json({
                data : 'کاربر با موفقیت عضو وبسایت شد',
                success : true
            });
        })
    }

}
