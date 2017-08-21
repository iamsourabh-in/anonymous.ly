var express = require('express');
var router = express.Router();

var Jimp = require("jimp");
var api = require('express-api-helper');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var gm = require('gm');
var uploadType = upload.array('foo', 10);


/* GET users listing. */
router.post('/new', function (req, res, next) {
    var rq_userId = req.body.userId == null ? "" : req.body.userId;
    var rq_imageName = req.body.imageName == null ? "" : req.body.imageName;
    var rq_text = req.body.text == null ? "" : req.body.text;
    var rq_effects = req.body.effects == null ? "" : req.body.effects;
    var effects = rq_effects.split(',');

    var imageCaption = rq_text;
    var fileName = 'public\\images\\baseimage\\' + rq_imageName;
    var loadedImage;

    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image.resize(1280, 720).quality(100);
            return Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
        })
        .then(function (font) {
            console.log(fileName);
            loadedImage.print(font, 120, 120, imageCaption)
            if (effects.indexOf('grayscale') > -1)
                loadedImage.grayscale();
            if (effects.indexOf('invert') > -1)
                loadedImage.invert();
            if (effects.indexOf('dither565') > -1)
                loadedImage.dither565();
            if (effects.indexOf('posterize') > -1)
                loadedImage.posterize(1);
            if (effects.indexOf('sepia') > -1)
                loadedImage.sepia();
            loadedImage.write(fileName + new Date().toDateString() + '.jpg');
            api.ok(req, res, 'created');
        })
        .catch(function (err) {
            console.error(err);
        });



});

router.post('/upload', uploadType, function (req, res, next) {
    if (!req.files)
        api.badRequest(req, res, "No files found")
    else {
        var up_file = req.files[0].path,
            tmp_path = req.files[0].path;


        /** The original name of the uploaded file stored in the variable "originalname". **/
        var target_path = 'uploads/' + up_file[0].originalname;

        /** A better way to copy the uploaded file. **/
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function () { api.ok(req, res, data) });
        src.on('error', function (err) { api.ok(req, res, err) });
    }
});


module.exports = router;
