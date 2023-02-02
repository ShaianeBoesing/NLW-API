import "express-async-errors";
import express, { NextFunction } from "express";
import { isLoggedIn } from "./middleware/isLoggedIn";

const app = express();
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");

declare global {
  var __token: string;
}

global.__token = "3c42bae0-53ff-4067-b4dd-0c4c2cd2d6b7";

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(isLoggedIn);
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
