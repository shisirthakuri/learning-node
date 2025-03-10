const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
    cb(null, './storage') //cd(error,success)
    },
    filename: function(req,file,cb){
        cb(null, "shisir-" + file.originalname)
    }
})
module.exports = {
    multer,
    storage
}