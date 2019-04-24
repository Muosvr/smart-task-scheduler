const express = require("express");
const router = express.Router();
const getCalEvents = require("../gCalAPI/calendar");
const googleLogin = require("../gCalAPI/oAuth");

// router.use("/", (req, res) => {
//   res.send("getCalEvents works");
// })

router.use("/get", (req, res) => {
  getCalEvents(sendRequest)
  function sendRequest(events, renewToken) {
    // if (renewToken){
    //   console.log("token needs to be renewed");
    //   res.send(renewToken.renewLink)
    // }
    res.send(events);
  }
})

router.use("/login", (req, res) =>{
  googleLogin(login);
  function login(url){
    res.send(url)
  }
})

module.exports = router;