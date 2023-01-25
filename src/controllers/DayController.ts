import * as express from "express";
import { z } from "zod";
import { DayService } from "../services/DayService";

export class DayController {
  async handle(req: express.Request, res: express.Response) {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(req.query);

    const dayService = new DayService();

    const day = await dayService.getDay({ date });

    res.send(day);
  }
}
