require("dotenv").config();
const { app, http } = require("./app");

const port = process.env.PORT || 8080;
http.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
