const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send("getCalEvents works");
})

router.use("login", (req, res) => {

})

module.exports = router;