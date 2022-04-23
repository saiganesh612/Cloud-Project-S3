const aws = require("aws-sdk")
const multerS3 = require("multer-s3")

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION
})

const s3 = new aws.S3()
const storage = multerS3({
    s3,
    acl: "public-read",
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: "inline",
    key: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

module.exports = { storage, s3 }
