const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Feed } = require('../models/Feed');
var fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); //해당 폴더에 파일저장.
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' | '.png' | '.gif' | '.jepg') {
            return cb(res.status(400).end('only image file is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadPhoto", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
});

router.post("/uploadFeed", (req, res) => {
    const feed = new Feed(req.body);
    const path = req.body.filePath;
    feed.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    }); //mongo db에 저장함.
});

router.get('/getAllFeeds', (req, res) => {
    Feed.find()
        .exec((err, feeds) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, feeds })
        })
});

router.post('/getFeedsByWriter', (req, res) => {
    Feed.find({ "writer": req.body.writer })
        .exec((err, feeds) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, feeds })
        })
});

module.exports = router;