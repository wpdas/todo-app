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
      finished: boolean;
    };

    const todoTask = await todoTaskTable(userId, payload.ticketId);
    const tasks = todoTask.table.tasks.map((task) => {
      if (task.id === payload.taskId) {
        task.finished = payload.finished;
      }
      return task;
    });
    todoTask.table.tasks = tasks;
    await todoTask.persist();

    res.status(200).json(todoTask.table.tasks);
  }
);

export default handler;
