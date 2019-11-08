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
  // console.log("updateTodos server", req.body)
  const todos = req.body.todos
    .map(todo => {
      return parseInt(todo.duration)
    })
  console.log('todos', todos)
  const availabilities =
    req.body.availability
      .map(element => {
        return parseInt(element.availability)
      })
  console.log('availabilities', availabilities)
  const result = measureArray(todos, availabilities);
  const resultDates = result.map(todoItem => {
    return todoItem
      .filter(dateIndex => {
        return req.body.availability[dateIndex].date !== 0;
      })
      .map(dateIndex => {
        return req.body.availability[dateIndex].date
      })
  })

  const assignedTodos = resultDates.map((todoDates, i) => {
    return {
      ...req.body.todos[i],
      assignedDates: todoDates
    }
  })
  const payload = {
    ...req.body,
    todos: assignedTodos
  }

  res.send(payload);
})


module.exports = router;