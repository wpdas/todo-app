import { todoTaskTable } from "@app/database";
import protectedHandler from "@app/utils/protectedHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "GET") {
      return res.status(404).send("");
    }

    const payload = req.query as { ticket_id: string };

    const todoTask = await todoTaskTable(userId, Number(payload.ticket_id));

    res.status(200).json(todoTask.table.tasks);
  }
);

export default handler;
