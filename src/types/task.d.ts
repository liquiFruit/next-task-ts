import { type Task } from "@prisma/client";
import { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

declare type TaskOperations = {
    updateTask: (task: inferProcedureInput<AppRouter["task"]["updateTask"]>) => void;
    deleteTask: (id: inferProcedureInput<AppRouter["task"]["delete"]>) => void;
};