import { db } from "./db";

export type TodoTicket = {
  ticketId: number;
  name: string;
};

class ListTable {
  public todoTickets: TodoTicket[] = [];
}

export const listTable = async (userId: string) =>
  await db.get_table(`list-${userId}`, new ListTable());
