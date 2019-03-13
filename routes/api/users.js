const express = require('express');
const router = express.Router();

//@route    Get api/users/tests
//@desc     Tests users route
//@access   Public
router.get('/test', (req, res) => res.json({
    msg: "Users Works"
}));

module.exports = router;