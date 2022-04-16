const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    socialId: String,
    imageUrl: String,
    email: String,
    fullName: String,
    username: String,
    folders: [
        {
            _id: false,
            folderName: String,
            files: [
                {
                    _id: false,
                    fileName: String,
                    src: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model("User", UserSchema)
