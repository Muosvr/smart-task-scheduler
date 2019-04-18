const express = require("express");
const router = express.Router();

router.use("/gettodos", (req, res) => res.send("todos works"));

module.exports = router;