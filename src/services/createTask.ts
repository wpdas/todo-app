import { Tasks } from "@app/types";
import { api } from "./api";

export interface CreateTaskPayload {
  ticketId: number;
  description: string;
}

const createTask = async (payload: CreateTaskPayload) => {
  const tasks = await api().post<Tasks>("task/new-task", payload);
  return tasks.data;
};
export default createTask;
