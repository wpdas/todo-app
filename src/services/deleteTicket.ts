import { Tickets } from "@app/types";
import { api } from "./api";

export interface DeleteTicketPayload {
  ticketId: number;
}

const deleteTicket = async (payload: DeleteTicketPayload) => {
  const tickets = await api().post<Tickets>("ticket/delete-ticket", payload);
  return tickets.data;
};
export default deleteTicket;
