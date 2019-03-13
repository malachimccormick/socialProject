const express = require('express');
const router = express.Router();

//@route    Get api/posts/tests
//@desc     Tests post route
//@access   Public
router.get('/test', (req, res) => res.json({
    msg: "posts Works"
}));

module.exports = router;