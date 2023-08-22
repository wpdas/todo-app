import { listTable } from "@app/database";
import { TodoTicket } from "@app/database/ListTable";
import protectedHandler from "@app/utils/protectedHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = protectedHandler(
  async (req: NextApiRequest, res: NextApiResponse, userId: string) => {
    if (req.method !== "POST") {
      return res.status(404).send("");
    }

    const payload = req.body as { name: string };

    const todoList = await listTable(userId);
    const newTicket: TodoTicket = {
      ticketId: Date.now(),
      name: payload.name,
    };
    todoList.table.todoTickets = [...todoList.table.todoTickets, newTicket];
    await todoList.persist();

    res.status(200).json(todoList.table.todoTickets);
  }
);

export default handler;
