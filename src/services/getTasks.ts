import { Tasks } from "@app/types";
import { api } from "./api";

type GetTasksPayload = {
  ticketId: number;
};

const getTasks = async (payload: GetTasksPayload) => {
  const tasks = await api().get<Tasks>(`task/${payload.ticketId}`);
  return tasks.data;
};

export default getTasks;
