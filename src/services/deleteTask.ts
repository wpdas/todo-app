import { Tasks, Tickets } from "@app/types";
import { api } from "./api";

export interface DeleteTaskPayload {
  ticketId: number;
  taskId: number;
}

const deleteTask = async (payload: DeleteTaskPayload) => {
  const tasks = await api().post<Tasks>("task/delete-task", payload);
  return tasks.data;
};
export default deleteTask;
