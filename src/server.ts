import "express-async-errors";
import express, { NextFunction } from "express";

const app = express();
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(
  (
    error: Error,
    request: express.Request,
    response: express.Response,
    next: NextFunction
  ) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(3333, () => {
  console.log("HTTP server running on port 3333...");
});
