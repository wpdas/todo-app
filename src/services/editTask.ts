import { Tasks } from "@app/types";
import { api } from "./api";

export interface EditTaskPayload {
  ticketId: number;
  taskId: number;
  finished: boolean;
}

const editTask = async (payload: EditTaskPayload) => {
  const tasks = await api().post<Tasks>("task/edit-task", payload);
  return tasks.data;
};
export default editTask;
