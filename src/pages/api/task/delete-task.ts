import { todoTaskTable } from "@app/database";
import protectedHandler from "@app/utils/protectedHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "POST") {
      return res.status(404).send("");
    }

    const payload = req.body as {
      ticketId: number;
      taskId: number;
    };

    const todoTask = await todoTaskTable(userId, payload.ticketId);
    const tasks = todoTask.table.tasks.filter(
      (task) => task.id !== payload.taskId
    );
    todoTask.table.tasks = tasks;
    await todoTask.persist();

    res.status(200).json(todoTask.table);
  }
);

export default handler;
