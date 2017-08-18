var express = require('express');
var router = express.Router();

var Jimp = require("jimp");
var api = require('express-api-helper');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');

var uploadType = upload.array('foo', 10);


/* GET users listing. */
router.get('/new', function (req, res, next) {
    var imageCaption = 'Sourbabh';
    var fileName = 'baseimage\\ccd.jpg';
    var loadedImage;

    // open a file called "lenna.png"
    Jimp.read(fileName, function (err, lenna) {
        if (err) throw err;
        lenna.resize(256, 256)            // resize
            .quality(100)                 // set JPEG quality
            .greyscale()                 // set greyscale
            .write("ccd-bw.jpg"); // save
    });

    Jimp.read(fileName)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, 20, 20, imageCaption).greyscale().posterize(5)
                .write(fileName + 'cd.jpg');
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
