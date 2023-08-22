import { Tickets } from "@app/types";
import { api } from "./api";

export interface CreateTicketPayload {
  name: string;
}

const createTicket = async (payload: CreateTicketPayload) => {
  const tickets = await api().post<Tickets>("ticket/new-ticket", payload);
  return tickets.data;
};
export default createTicket;
