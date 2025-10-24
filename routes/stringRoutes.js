const express = require("express");
const { createString } = require("../controllers/stringController.js");
const { getString } = require("../controllers/stringController.js");
const { getAllStrings } = require("../controllers/stringController.js");
const { deleteString } = require("../controllers/stringController.js");
const { stringsDB } = require("../models/stringModel.js");

const router = express.Router();

router.post("/", createString);
router.get("/", getAllStrings);
router.post("/clear", (req, res) => {
  stringsDB.clear();
  res.status(200).json({ message: "Database cleared for now" });
});
router.get("/:string_value", getString);
router.delete("/:string_value", deleteString);


module.exports = router;
