import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

interface ToggleHabitInterface {
  id: string;
}

export class SummaryService {
  async generateSummary() {
    const summary = await prisma.$queryRaw`
    SELECT
      D.id,
      D.date,
      (
        SELECT
          cast(count(*) AS float)
        FROM day_habits DH
        WHERE DH.day_id = D.id
      ) as completed,
      (
        SELECT
          cast(count(*) AS float)
        FROM habit_week_days HWD
        JOIN habits H
          ON H.id = HWD.habit_id
        WHERE  HWD.week_day = cast(strftime('%w', D.date/1000, 'unixepoch') AS int)
        AND H.created_at <= D.date
      ) as amount
    FROM days D

  `;

    return summary;
  }
}
