const express = require("express");

const router = express.Router();

const { createuser, signin, signout } = require("../controllers/user");

router.post("/createuser", createuser);
router.post("/signin", signin);
router.get("/signout", signout);
module.exports = router;
