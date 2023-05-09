type TaskOperations = {
    updateTask: (id: string, task: Partial<Task>) => void;
    deleteTask: (id: string) => void;
};