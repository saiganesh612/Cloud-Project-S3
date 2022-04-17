const express = require("express")
const router = express.Router()
const User = require("../models/Users")
const Storage = require("../models/Storage")
const validateUser = require("../middlewares/user.validator")

router.get("/get-folders", ...validateUser(), async (req, res) => {
    const { userId } = req.query
    try {
        const user = await User.findOne({ socialId: { $eq: userId } }).populate({ path: 'folders' })
        if (!user) throw "Their is no user with this Id."

        res.status(200).json({ message: "Retrived", folders: user.folders.reverse() })
    }
    catch (err) {
        res.status(403).json({ message: err })
    }
})

router.post("/create-new-folder", ...validateUser(), async (req, res) => {
    const { folderName, id } = req.body
    try {
        const user = await User.findOne({ socialId: { $eq: id } }).populate({ path: 'folders' })
        if (!user) throw "Their is no user with this Id."

        const folders = user.folders
        const isExist = folders.find(folder => folder.folderName == folderName)
        if (isExist) throw "There is already a folder with this name."

        const newFolder = new Storage({ folderName })
        user.folders.push(newFolder)
        await newFolder.save()
        await user.save()

        res.status(200).json({ message: "Created" })
    }
    catch (err) {
        res.status(403).json({ message: err })
    }
})

module.exports = router
