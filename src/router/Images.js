let express = require('express');
let images = express.Router();
let ImageDao = require("../dao/ImageDao.js");

images.path = "/img";

images.get("/:Dir?", async(req,res) => {
    try {
        let dao = new ImageDao(req.params.Dir);
        res.json(dao.getAll());
    } catch (e) {
        if(e.message === "404")
            res.status(404).json({message:"Page not Found!"});

        res.status(500).json({message:"There was an error!"});
    }

});

images.post("/:Dir", async(req,res) => {
    if(req.session.user.roles.includes("Admin")) {
        try {
            let dao = new ImageDao(req.params.Dir);
            dao.upload(req.files.image.name, req.files.image.data,
                        req.files.image.mimetype);
            res.status(200).end();
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(500).json({message:"You need to be an admin to do that!"});
    }
});

images.delete("/:Dir", async(req,res) => {
    if(req.session.user.roles.includes("Admin")) {
        try {
            let dao = new ImageDao(req.params.Dir);
            dao.delete(req.file.image.name);
            res.status(200).end();
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(500).json({message:"You need to be an admin to do that!"});
    }
});

module.exports = images;
