import { useCallback, useState } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Loading from "./Loading";
import createTicket from "@app/services/createTicket";
import { Tickets } from "@app/types";

type Props = {
  onCreateTicket: (tickets: Tickets) => void;
};

const NewTicketForm: React.FC<Props> = ({ onCreateTicket }) => {
  const [ticketName, setTicketName] = useState("");
  const [status, setStatus] = useState<"pending" | "ready">("ready");

  const onInputChange = (greetingValue: string) => {
    setTicketName(greetingValue);
  };

  const onBtnClick = useCallback(async () => {
    setStatus("pending");
    const updatedTickets = await createTicket({ name: ticketName });
    setStatus("ready");
    onCreateTicket(updatedTickets);
    setTicketName("");
  }, [ticketName, onCreateTicket]);

  const disabled = ticketName.length < 3;

  return (
    <>
      {status === "pending" ? (
        <Loading />
      ) : (
        <InputGroup size="md">
          <Input
            bg="gray.50"
            pr="4.5rem"
            type="text"
            placeholder="New Ticket"
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onBtnClick();
              }
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              opacity={disabled ? 0.4 : 1}
              cursor={disabled ? "not-allowed" : "pointer"}
              colorScheme="purple"
              h="1.75rem"
              size="sm"
              onClick={disabled ? undefined : onBtnClick}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </>
  );
};

export default NewTicketForm;
