var express = require('express');
var router = express.Router();
var fs = require('fs');
var Jimp = require("jimp");


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
                .write(fileName+'cd.jpg');
        })
        .catch(function (err) {
            console.error(err);
        });

});

module.exports = router;
