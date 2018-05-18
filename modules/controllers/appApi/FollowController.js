'use strict';

const User = require(`${config.path.model}/user`);
const Follow = require(`${config.path.model}/follow`);

class FollowController{

    constructor() {
    }


    store(req, res) {

        let follower = req.body.follower;
        let followee = req.params.id;

        let follow = new Follow({
            follower: follower,
            followee: followee,
        });

        follow.save(function (err) {

            if (err) {
                return res.status(404).json({
                    succes: false,
                    status: 404,
                    data: {},
                    message: 'مشکلی در دنبال کردن کاربر به وجود آمد'
                });
            }

            return res.status(200).json({

                success: true,
                status: 200,
                data: follow,
                message: 'کاربر با موفقیت دنبال شد'

            });
        });
    }

    destroy(req, res) {

        let follower = req.params.followerid;
        let followee = req.params.id;

        Follow.remove({ 'follower': follower, 'followee': followee }, (err, result) => {

            if (err) {
                return res.status(404).json({
                    success: false,
                    status: 404,
                    data: {},
                    message: 'در حذف مورد مشکلی به وجود آمد'
                });
            }


            return res.status(201).json({
                success: true,
                status: 201,
                data: {},
                message: 'کاربر با موفقیت حذف شد'
            })

        });
    }

}

module.exports = FollowController;
