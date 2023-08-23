import Container from "@app/components/Container";
import NewTicketForm from "@app/components/NewTicketForm";
import Ticket from "@app/components/Ticket";
import useAuth from "@app/hooks/useAuth";
import getTicketList from "@app/services/getTicketList";
import { Tickets } from "@app/types";
import {
  Box,
  Heading,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Home() {
  const [tickets, setTickets] = useState<Tickets>([]);
  const [isLargerThan376] = useMediaQuery("(min-width: 376px)");
  const [ready, isReady] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.userId) {
      router.push("/sign-in");
    }
  }, [auth, router]);

  useEffect(() => {
    // Load tickets
    if (auth.userId) {
      getTicketList().then((tickets) => {
        setTickets(tickets);
        isReady(true);
      });
    }
  }, [auth]);

  console.log(ready, tickets);

  if (!ready) {
    return (
      <Container>
        <Box w="100%" display="flex">
          <Spinner
            margin="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
            mt="22%"
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Stack
        zIndex={999}
        position="fixed"
        top={0}
        bg="purple.800"
        w="100%"
        mb={4}
        flexDirection={isLargerThan376 ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <Heading as="h4" size="md" color="gray.50">
          Todo List
        </Heading>
        <Box width="100%" maxW="240px">
          <NewTicketForm
            onCreateTicket={(updatedTickets) => setTickets(updatedTickets)}
          />
        </Box>
      </Stack>

      <Stack
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        mt={isLargerThan376 ? 100 : 130}
        pb={8}
      >
        {tickets.length === 0 && ready && (
          <Text color="gray.300">No Tickets</Text>
        )}
        {tickets.map((ticket) => (
          <Ticket
            onDeleteTicket={(updatedTickets) => setTickets(updatedTickets)}
            key={ticket.ticketId}
            {...ticket}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default Home;
