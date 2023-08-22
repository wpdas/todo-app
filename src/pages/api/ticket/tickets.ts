import { NextApiRequest, NextApiResponse } from "next";
import { listTable } from "@app/database";
import protectedHandler from "@app/utils/protectedHandler";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "GET") {
      return res.status(404).send("");
    }

    // Get tickets
    const todoList = await listTable(userId);
    res.status(200).json(todoList.table.todoTickets);
  }
);

export default handler;
