const express = require("express");
const { createString } = require("../controllers/stringController.js");
const { getString } = require("../controllers/stringController.js");
const { getAllStrings } = require("../controllers/stringController.js");
const { deleteString } = require("../controllers/stringController.js");

const router = express.Router();

router.post("/", createString);
router.get("/", getAllStrings);
router.get("/:string_value", getString);
router.delete("/:string_value", deleteString);

module.exports = router;
