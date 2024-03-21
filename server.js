const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// set up express app
const app = express();
const PORT = process.env.PORT || 3001;

// set up express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set up routes
app.use("/api", routes);

// sync sequelize models to the database, then turn on the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
});
