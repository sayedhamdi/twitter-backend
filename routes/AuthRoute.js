const express = require("express");
const router = express.Router();

const {loginUser } = require('../Controllers/AuthControllers')


router.post("/login", loginUser);


module.exports = router;
