const express = require("express");
const router = express.Router();
const loginController = require("../controller/controller");
const Auth = require("../middleware/is-Auth");

router.post("/signup", loginController.signup);
router.post("/login", loginController.login);
router.post("/new-post", Auth.verifyToken, loginController.createPost);

module.exports = router;
