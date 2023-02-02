import { isLoggedIn } from "./middleware/isLoggedIn";
import { UsersController } from "./controllers/UsersController";
import { HabitsControler } from "./controllers/HabitsController";
import { DayController } from "./controllers/DayController";
import { SummaryController } from "./controllers/SummaryController";

const routes = require("express").Router();
const habitsControler = new HabitsControler();
const dayController = new DayController();
const summaryController = new SummaryController();
const usersController = new UsersController();

routes.post("/create", usersController.create);
routes.post("/login", usersController.login);
routes.post("/habits", isLoggedIn, habitsControler.createHabit);
routes.get("/day", isLoggedIn, dayController.handle);
routes.patch("/habits/:id/toggle", isLoggedIn, habitsControler.toggleHabit);
routes.get("/summary", isLoggedIn, summaryController.generateSummary);

module.exports = routes;
