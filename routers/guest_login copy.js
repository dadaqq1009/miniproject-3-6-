const express = require("express");
const router = express.Router();
const GuestLoginController = require("../controllers/guest_login.controller");

guestLoginController = new GuestLoginController();

router.post("/login/guest", guestLoginController.guestLogin);
module.exports = router;
