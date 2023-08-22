import { Tickets } from "@app/types";
import { api } from "./api";

const getTicketList = async () => {
  const tickets = await api().get<Tickets>("ticket/tickets");
  return tickets.data;
};

export default getTicketList;
