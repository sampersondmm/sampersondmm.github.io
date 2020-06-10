const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    console.log(req.body)
    try {
        let user = await db.User.create(req.body);
        let {id, email, profileImageUrl} = user;
        let token = jwt.sign(
            {
                id,
                email
            }, 
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            email,
            token
        });
    } catch(err) {
        // if validation fails
        if(err.code === 11000){
            err.message = 'Sorry, that email is already taken';
        }
        return next({
            status: 400,
            message: err.message
        })
    }

}

exports.signin = async (req, res, next) => {
    try {
       let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, email, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    email,
                    profileImageUrl
                }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id, 
                email,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email/Password'
            })
        }
    } catch(err) {
        return next({status: 400, message: 'Invalid Email/Password'});
    }
}