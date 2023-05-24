import { useState } from "react";

import { api } from "~/utils/api";

import Task from "~/components/tasks/Task";
import CreateTaskForm from "~/components/tasks/CreateTaskForm";
import type { TaskOperations } from "~/types/task";
import { useRouter } from "next/router";
import { useGroup } from "~/hooks/groups";

const GroupView: React.FC = () => {
	const groupId = useRouter().query.id as string;
	const { group, fetchGroup } = useGroup(groupId);

	const [isCreateTask, setCreateTask] = useState(false);

	const { data: tasks, refetch: refetchTasks } = api.task.getTasks.useQuery({
		groupId,
	});
	const { mutate: updateTaskMutate } = api.task.updateTask.useMutation();
	const { mutate: deleteTaskMutate } = api.task.delete.useMutation();

	const handleShowTaskCreate = () => setCreateTask(!isCreateTask);

	console.log("fetching groups")
	fetchGroup();

	const operations: TaskOperations = {
		updateTask(task) {
			updateTaskMutate(task, {
				onError: (e) => alert(e.message),
			});
		},
		deleteTask(id) {
			deleteTaskMutate(id, {
				onError(err) {
					alert(err);
				},
				onSuccess() {
					alert("successfully deleted");
				},
			});
		},
	};

	if (!group)
		return (
			<>
				<p className="text-3xl text-center">Loading...</p>
			</>
		);

	return (
		<>
			{/* Header */}
			<div className="flex flex-row justify-between items-center">
				<p className="text-xl mb-2 font-500">{group.title}</p>
				<div
					onClick={handleShowTaskCreate}
					className="icon-pen text-2xl"
				/>
			</div>

			{/* Body */}
			<div className="flex flex-col gap-3">
				{isCreateTask && (
					<CreateTaskForm
						groupId={group.id}
						onCancel={handleShowTaskCreate}
						onCreated={handleShowTaskCreate}
					/>
				)}

				{!tasks ? (
					<p className="text-light-2">No tasks to show.</p>
				) : (
					tasks.map((task) => (
						<Task
							key={task.id}
							task={task}
							operations={operations}
						/>
					))
				)}
			</div>
		</>
	);
};

export default GroupView;
