import { listTable } from "@app/database";
import protectedHandler from "@app/utils/protectedHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "POST") {
      return res.status(404).send("");
    }

    const payload = req.body as { ticketId: number };

    const todoList = await listTable(userId);
    // Remove ticket
    todoList.table.todoTickets = todoList.table.todoTickets.filter(
      (ticket) => ticket.ticketId !== payload.ticketId
    );
    await todoList.persist();

    res.status(200).json(todoList.table.todoTickets);
  }
);

export default handler;
