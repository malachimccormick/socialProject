const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


//Load input Validation
const validatRegisterInput = require('../../valadation/register')
const validatLoginInput = require('../../valadation/login')

//load user model
const User = require('../../models/User');

//@route    Get api/users/tests
//@desc     Tests users route
//@access   Public
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

//@route    Get api/users/register
//@desc     register a user 
//@access   Public
router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validatRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    default: 'mm' //deafult
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))

                    })
                })
            }
        })
})

//@route    Get api/users/login 
//@desc     Login user / Returning JWT Token
//@access   Public
router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = validatLoginInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;


    // find the user by email
    User.findOne({
            email
        })
        .then(user => {
            //check for user
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMAtch => {
                    // User Matched
                    if (isMAtch) {

                        //create jwt payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        //Sign Token
                        jwt.sign(payload,
                            keys.secretOrKey, {
                                expiresIn: 10800
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        errors.password = 'Password incorrect'
                        return res.status(400).json(errors)
                    }
                })
        })
})


//@route    Get api/users/current
//@desc     return current user
//@access   Private

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = router;