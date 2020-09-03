const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Gif = require("../models/gif");

exports.gifById = (req, res, next, id) => {
  Gif.findById(id).exec((err, gif) => {
    if (err || !gif) {
      return res.status(400).json({
        error: "Gif not found",
      });
    }
    req.gif = gif;
    next();
  });
};

exports.read = (req, res) => {
  req.gif.image = undefined;
  return res.json(req.gif);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Gif could not be uploaded",
      });
    }
    const { name, description } = fields;
    if (!name || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let gif = new Gif(fields);
    if (files.image) {
      console.log("FILES PHOTO:  ", files.image);
      if (files.image.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      gif.image.data = fs.readFileSync(files.image.path);
      gif.image.contentType = files.image.type;
    }

    gif.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let gif = req.gif;
  gif.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "gif deleted successfully",
    });
  });
};
