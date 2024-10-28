import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseUrl = "http://localhost:4000";

export const useTasks = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/task/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch the tasks");
      }
      return (await response.json()) as Task[];
    },
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      await fetch(`${baseUrl}/api/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      completedOn,
    }: Partial<Task> & { id: Task["id"] }) => {
      await fetch(`${baseUrl}/api/task/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title,
          completedOn,
        }),
      });

      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export type Task = {
  id: number;
  title: string;
  completedOn: Date | null;
};
