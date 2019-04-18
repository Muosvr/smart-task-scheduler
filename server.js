const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const todos = require("./routes/getTodos");

app.get("/", (req, res) => res.send("Hello"));

app.use("/api", todos);

app.listen(port, () => console.log(`App listening on port ${port}`));