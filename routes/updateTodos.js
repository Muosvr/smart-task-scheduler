const express = require("express");
const router = express.Router();

const sampleData = {
  todos: [{
    "desctiption": "Do laundry",
    "duration": 3.5,
    "deadline": "07-31-2019"
  }, {
    "description": "Complete HackerRank Challenge",
    "duration": 2
  },
  {
    "description": "Follow up on client emails",
    "duration": 1
  }
  ],
  availability: {
    nextSevenDays: [1, 0.3, 0.5, 1.5, 3, 2.1]
  }
}
// console.log(sampleData);



router.post("/", (req, res) => {
  const todos = req.body.todos;
  const availability =
    console.log("todos: ", todos);


  res.send(todos);
})

module.exports = router;