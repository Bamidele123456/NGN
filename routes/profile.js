// routes/profile.js
const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController");

// Route for GET /me
router.get("/", getProfile);

module.exports = router;
