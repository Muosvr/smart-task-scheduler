var keys = {};
if (process.env.NODE_ENV === "production") {
  console.log("production env detected");
} else {
  console.log("development env detected");
  const devKeys = require("./devKeys");
  keys = devKeys;
}
module.exports = keys;