const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true, //Any space inbetween will be trimed off
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true, //Any space inbetween will be trimed off
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true, //Any space inbetween will be trimed off
      required: true,
      maxlength: 32,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    hashed_password: { type: String, required: true },
    gender: { type: String, required: true },
    jobRole: { type: String, required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
