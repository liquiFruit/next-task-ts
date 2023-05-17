import { useState } from "react";

import { api } from "~/utils/api";

import Task from "~/components/tasks/Task";
import CreateTaskForm from "./CreateTaskForm";
import type { TaskOperations } from "~/types/task";

type TaskGroupProps = {
	groupId: string,
	title: string
}
const TaskGroup: React.FC<TaskGroupProps> = ({ groupId, title }) => {
	const [isCreateTask, setCreateTask] = useState(false)

	const { data: tasks, refetch: refetchTasks } = api.task.getTasks.useQuery({ groupId })
	const { mutate: updateTaskMutate } = api.task.updateTask.useMutation()
	const { mutate: deleteTaskMutate } = api.task.delete.useMutation()
	
	const handleShowTaskCreate = () => setCreateTask(!isCreateTask)



	const operations: TaskOperations = {
		updateTask(task) {
			updateTaskMutate(task, {
				onError: (e) => alert(e.message)
			})
		},
		deleteTask(id) {
			deleteTaskMutate(id, {
				onError(err) {
					alert(err)
				},
				onSuccess() {
					alert("successfully deleted")
				}
			})

		},
	}


	return (
		<>
			{/* Header */}
			<div className="flex flex-row justify-between items-center">
				<p className="text-xl mb-2 font-500">{title}</p>
				<div onClick={handleShowTaskCreate} className="icon-pen text-2xl" />
			</div>

			{/* Body */}
			<div className="flex flex-col gap-3">
				{isCreateTask && (
					<CreateTaskForm groupId={groupId} onCancel={handleShowTaskCreate} onCreated={handleShowTaskCreate} />
				)}

				{!tasks ? (
					<p className="text-light-2">No tasks to show.</p>
				) : (
					tasks.map((task) => (
						<Task key={task.id} task={task} operations={operations} />
					))
				)}
			</div>
		</>
	);
};

export default TaskGroup;
