const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

//load user model
const User = require('../../models/Users')

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
    User.findOne({
            email: req.body.email
        })
        .then(user, () => {
            if (user) {
                return res.status(400).json({
                    email: 'email already exists'
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    default: mm //deafult
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
                            .catch(console.log(err))

                    })
                })
            }
        })
})
module.exports = router;