import * as express from "express";
import { z } from "zod";
import { SummaryService } from "../services/SummaryService";

export class SummaryController {
  async generateSummary(req: express.Request, res: express.Response) {
    const summaryService = new SummaryService();

    const summary = await summaryService.generateSummary();

    res.send(summary);
  }
}
