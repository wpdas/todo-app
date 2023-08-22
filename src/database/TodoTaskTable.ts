import { db } from "./db";

export type Task = {
  id: number;
  description: string;
  finished: boolean;
};

class TodoTaskTable {
  public tasks: Task[] = [];
}

export const todoTaskTable = async (userId: string, ticketId: number) =>
  db.get_table(`todo-task-${userId}-${ticketId}`, new TodoTaskTable());
