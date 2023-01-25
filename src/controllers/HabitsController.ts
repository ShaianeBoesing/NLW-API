import * as express from "express";
import { z } from "zod";
import { HabitsService } from "../services/HabitsService";

export class HabitsControler {
  async createHabit(req: express.Request, res: express.Response) {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(req.body);

    const habitsService = new HabitsService();

    await habitsService.createHabit({ title, weekDays });

    res.sendStatus(200);
  }

  async toggleHabit(req: express.Request, res: express.Response) {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(req.params);

    const habitsService = new HabitsService();

    await habitsService.toggleHabit({ id });

    res.sendStatus(200);
  }
}
