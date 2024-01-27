
//for image
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function (req,file,cb){
        const uniqueFileName = Date.now() + "_" + file.originalname;
        cb(null, file.fieldname + "_" + uniqueFileName);
    }
})
const upload = multer({storage})

module.exports = upload;