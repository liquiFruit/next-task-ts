import { api } from "~/utils/api";
import { type Task as ITask } from "@prisma/client";

import Task from "~/components/tasks/Task";

const TaskGroup: React.FC<{ title: string; tasks: ITask[] }> = ({
	title,
	tasks,
}) => {
	const { mutate: updateMutation } = api.task.update.useMutation();
	const { mutate: deleteMutation } = api.task.delete.useMutation();

	const { refetch } = api.task.get.useQuery();
	const operations: TaskOperations = {
		updateTask: (id: string, task: Partial<ITask>) => {
			updateMutation(
				{ id, ...task },
				{
					onSuccess: () => void refetch(),
				}
			);
		},

		deleteTask: (id: string) => {
			deleteMutation(
				{ id },
				{
					onSuccess: () => void refetch(),
				}
			);
		},
	};

	tasks = tasks.filter((task, _i, _arr) => !task.archived);

	return (
		<>
			<div className="flex flex-row justify-between items-center px-6">
				<p className="text-xl mb-2 font-500">{title}</p>
        <div className="i-solar-pen-new-square-line-duotone text-2xl"/>
			</div>
			<div className="flex flex-col gap-3">
				{tasks?.map((task, _i, _a) => (
					<Task key={task.id} task={task} operations={operations} />
				))}
			</div>
		</>
	);
};

export default TaskGroup;
