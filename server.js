const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const todos = require("./routes/getTodos");
const calevents = require("./routes/getCalEvents");

app.get("/", (req, res) => res.send("Hello"));

app.use("/todos", todos);
app.use("/calevents", calevents);

app.listen(port, () => console.log(`App listening on port ${port}`));