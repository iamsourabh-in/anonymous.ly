var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {

    var text2png = require('text2png');
    fs.writeFileSync('out.png', text2png('Hello!', { textColor: 'blue' }));
    res.send('respond with a resource');
});

module.exports = router;
