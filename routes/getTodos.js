const express = require("express");
const router = express.Router();

router.use("/", (req, res) => res.send("todos works"));


module.exports = router;