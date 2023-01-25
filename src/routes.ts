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
routes.post("/habits", habitsControler.createHabit);
routes.get("/day", dayController.handle);
routes.patch("/habits/:id/toggle", habitsControler.toggleHabit);
routes.get("/summary", summaryController.generateSummary);

module.exports = routes;
