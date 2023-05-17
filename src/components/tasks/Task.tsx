import { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Task as TaskType } from "@prisma/client";
import type { TaskOperations } from "~/types/task";

type TaskParameters = {
	task: TaskType;
	operations: TaskOperations;
};

const Task: React.FC<TaskParameters> = ({
	task,
	operations: { updateTask, deleteTask },
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-dark-2 rounded">
			{/* Header */}
			<div
				className="bg-dark-3 flex flex-row items-center justify-between rounded p-6"
				onClick={(_e) => setIsOpen(!isOpen)}
			>
				<p className="font-serif font-medium">{task.title}</p>
				<div
					onClick={(e) => {
						e.stopPropagation();
						e.currentTarget.classList.add("animate-ping");
						task.complete = !task.complete
						updateTask({ id: task.id, complete: task.complete });
					}}
					className={` 
            text-3xl 
            ${!task.archived
							? "icon-check"
							: "icon-time"
						}
            ${task.complete
							? "text-success animate-count-1 animate-reverse animate-ping"
							: task.archived && !task.complete
								? "text-warning icon-archive"
								: ""
						}`}
				/>
			</div>

			{/* Body */}
			{isOpen && (
				<div className="p-6 pt-3">
					{/* Quick info */}
					<div className="flex flex-row flex-wrap gap-x-6 gap-y-1">
						{task.complete && task.completedAt ? (
							// "Completed At"
							<div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
								<div className="icon-check scale-125" />
								<p>{`${dayjs(task.completedAt).fromNow()}`}</p>
							</div>
						) : (
							// "Created at"
							<div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
								<div className="icon-time scale-125" />
								<p>{`${dayjs(task.createdAt).fromNow()}`}</p>
							</div>
						)}

						{/* Category */}
						<div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
							<div className="icon-pie-chart scale-125" />
							<p>{`Personal`}</p>
						</div>
					</div>

					{/* Description */}
					{task.description && (
						<p className="text-light-2 my-3">{task.description}</p>
					)}

					{/* Buttons */}
					<div className="mt-6 flex flex-row justify-center gap-6">
						<div
							onClick={(_e) => {
								task.archived = !task.archived
								updateTask(task);
							}}
							className="button-warning"
						>
							Archive
						</div>
						<div
							onClick={(_e) => {
								deleteTask({id: task.id});
							}}
							className="button-danger"
						>
							Delete
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Task;
