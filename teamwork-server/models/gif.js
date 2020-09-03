const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 4000,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Gif", gifSchema);
