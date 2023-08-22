import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  IconButton,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Task, Tasks, Tickets } from "@app/types";
import Loading from "./Loading";
import getTasks from "@app/services/getTasks";
import NewTaskForm from "./NewTaskForm";
import editTask from "@app/services/editTask";
import deleteTicket from "@app/services/deleteTicket";
import deleteTask from "@app/services/deleteTask";
import { DeleteIcon } from "@chakra-ui/icons";
import useModal from "@app/hooks/useModal";

type Props = {
  ticketId: number;
  name: string;
  onDeleteTicket: (updatedTickets: Tickets) => void;
};

const Ticket: React.FC<Props> = ({ ticketId, name, onDeleteTicket }) => {
  const [status, setStatus] = useState<"ready" | "pending">("pending");
  const [tasks, setTasks] = useState<Tasks>([]);
  const [isLargerThan560] = useMediaQuery("(min-width: 560px)");
  const { showModal } = useModal();

  useEffect(() => {
    getTasks({ ticketId }).then((tasks) => setTasks(tasks));
    setTimeout(() => {
      setStatus("ready");
    }, 500);
  }, [ticketId]);

  const switchTaskComplete = useCallback(
    async (task: Task) => {
      // Save changes (not using await as this can be done in the background)
      editTask({
        ticketId,
        taskId: task.id,
        finished: !task.finished,
      });

      // Update on client side
      const updatedTasks = tasks.map((taskItem) => {
        if (taskItem.id === task.id) {
          taskItem.finished = !task.finished;
        }
        return taskItem;
      });
      setTasks(updatedTasks);
    },
    [ticketId, tasks]
  );

  const onDeleteClick = useCallback(async () => {
    showModal("Are you sure?", "Do you really want to delete it?", async () => {
      setStatus("pending");
      const updatedTickets = await deleteTicket({ ticketId });
      onDeleteTicket(updatedTickets);
    });
  }, [onDeleteTicket, ticketId]);

  const onRemoveTaskClick = useCallback(
    async (task: Task) => {
      showModal("Are you sure?", "Do you really want to delete it?", () => {
        // Save changes (not using await as this can be done in the background)
        deleteTask({ ticketId, taskId: task.id });

        // Update on client side
        const updatedTasks = tasks.filter(
          (taskItem) => taskItem.id !== task.id
        );
        setTasks(updatedTasks);
      });
    },
    [ticketId, tasks]
  );

  return (
    <Stack
      border="1px solid"
      borderColor="purple.200"
      borderRadius={8}
      minW={isLargerThan560 ? "300px" : "95%"}
      minH="300px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        bg="purple.200"
        p={4}
        borderTopRadius={8}
      >
        <Heading as="h4" size="md" color="purple.800">
          {name}
        </Heading>
        <Button colorScheme="purple" size="xs" onClick={onDeleteClick}>
          Delete
        </Button>
      </Box>
      <Box p={2}>
        <NewTaskForm
          ticketId={ticketId}
          onCreateTask={(tasks) => setTasks(tasks)}
        />
      </Box>
      <Divider />
      <Stack justifyContent="center" flexDirection="row">
        {tasks.length === 0 && status === "ready" && (
          <Text color="gray.300">No Tasks</Text>
        )}
      </Stack>
      <Stack p={4}>
        {status !== "ready" ? (
          <Loading />
        ) : (
          <Stack spacing={5} direction="column">
            {tasks.map((task) => (
              <Box key={task.id} display="flex" justifyContent="space-between">
                <Checkbox
                  opacity={task.finished ? 0.4 : 1}
                  textDecoration={task.finished ? "line-through" : "none"}
                  colorScheme="purple"
                  checked={task.finished}
                  defaultChecked={task.finished}
                  onChange={() => switchTaskComplete(task)}
                >
                  {task.description}
                </Checkbox>
                <IconButton
                  ml={4}
                  size="xs"
                  colorScheme="purple"
                  aria-label="Delete task"
                  icon={<DeleteIcon />}
                  onClick={() => onRemoveTaskClick(task)}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Ticket;
