const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.get("/:user", (req, res) => {
  // console.log("received from axios", req.body);
  console.log("looking up", { name: req.params.user });
  console.log("data from client", req.params.user)
  User.findOne({ name: req.params.user }, (err, doc) => {
    if (!doc) {
      res.send("User does not exist");
      console.log("User does not exist");
    } else {
      res.status(200).send(doc);
    }
  })
});

router.post("/", (req, res) => {
  console.log("received from client", req.body);
  User.findOne({ name: req.body.name }, (err, doc) => {
    if (!doc) {
      const newUser = new User(req.body);
      newUser.save()
        .then(() => {
          console.log("document saved");
          res.status(200).send(req.body);
        })
        .catch(err => {
          console.log(err)
          res.send("Error saving", err)
        });
    } else {
      const payload = {
        name: req.body.name,
        todos: req.body.todos
      }
      User.findOneAndUpdate({ name: req.body.name }, { $set: payload }, { useFindAndModify: false })
        .then(() => {

          console.log("Update successfule")
          res.status(200).send(payload)
        })
    }
  }).catch(err => {
    console.log("Error", err)
    res.send("Error saving", err)
  });

})

module.exports = router;