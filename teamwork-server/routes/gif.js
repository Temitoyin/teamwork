const express = require("express");

const router = express.Router();

const { create, gifById, read, remove } = require("../controllers/gif");
const { userById } = require("../controllers/user");

//Get
router.get("/gif/:gifId", read);

//Post
router.post("/gif/:gifId/:userId", remove);
router.post("/gif/create/:userId", create);
router.param("userId", userById);
router.param("gifId", gifById);
module.exports = router;
