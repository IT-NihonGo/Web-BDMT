const multer = require('multer')
const path = require('path')

const fs = require('fs')
const destination = process.cwd() + '/public/images/posts/'

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destination);
    },
    filename: function (request, file, cb) {
        console.log(path.extname(file.originalname));
        cb(null, `post${request.params.id}-${file.originalname}${path.extname(file.originalname)}`)
    },
});
var uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = uploader
