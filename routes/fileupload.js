const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var path = require('path');

//Upload a file
router.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.status(400).json({ message: "No file uploaded" });
        } else {
            let file = req.files.file;
            let extension = path.extname(file.name);
            
            const salt = await bcrypt.genSalt(10);
            const hashedFilename = await bcrypt.hash(file.name, salt);

            file.mv('uploads/' + hashedFilename + extension, function(err) {
                if (err) {
                    res.status(400).json({ message: err });
                }
            });
            res.status(201).json({ message: "File uploaded"})
        }
    } catch {
        res.status(500).json({ message: "Error" });
    }
});

module.exports = router;