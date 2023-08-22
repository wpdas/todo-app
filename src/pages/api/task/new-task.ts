import { todoTaskTable } from "@app/database";
import protectedHandler from "@app/utils/protectedHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "POST") {
      return res.status(404).send("");
    }

    const payload = req.body as { ticketId: number; description: string };

    const todoTask = await todoTaskTable(userId, payload.ticketId);
    todoTask.table.tasks.push({
      id: Date.now(),
      description: payload.description,
      finished: false,
    });
    await todoTask.persist();

    res.status(200).json(todoTask.table.tasks);
  }
);

export default handler;
