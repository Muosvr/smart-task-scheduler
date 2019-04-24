const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  todos: [{
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number
    },
    deadline: {
      type: Date
    }
  }]
})

module.exports = mongoose.model("user", User);