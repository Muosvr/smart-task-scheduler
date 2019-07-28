const express = require("express");
const router = express.Router();
const measureArray = require("../utils/measureArray");


// const sampleData = {
//   todos: [{
//     "desctiption": "Do laundry",
//     "duration": 3.5,
//     "deadline": "07-31-2019"
//   }, {
//     "description": "Complete HackerRank Challenge",
//     "duration": 2
//   }, {
//     "description": "Follow up on client emails",
//     "duration": 1
//   }
//   ],
//   availability: [
//     { "date": "07-28-2019", "availability": 1 },
//     { "date": "07-29-2019", "availability": 2.3 },
//     { "date": "07-30-2019", "availability": 2.5 },
//     { "date": "07-31-2019", "availability": 1.5 },
//     { "date": "08-01-2019", "availability": 3 },
//     { "date": "08-02-2019", "availability": 2.1 },
//     { "date": "08-03-2019", "availability": 2.1 },
//     { "date": "08-04-2019", "availability": 5 }]
// };

router.post("/", (req, res) => {
  const todos = req.body.todos
    .map(todo => {
      return todo.duration
    })
  const availabilities =
    req.body.availability
      .map(element => {
        return element.availability
      })
  const result = measureArray(todos, availabilities);
  const resultDates = result.map(todoItem => {
    return todoItem.map(dateIndex => {
      return req.body.availability[dateIndex].date
    })
  })

  res.send({ resultDates });
})

module.exports = router;