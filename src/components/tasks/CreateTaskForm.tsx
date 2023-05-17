import { useState, useRef } from "react";

import { api } from "~/utils/api";

type CreateTaskFormProps = {
	groupId: string,

	onCreated?: () => void,
	onCancel?: () => void
}
const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ groupId, onCreated, onCancel }) => {
	const addButton = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	// CRUD api
	const { mutate, isLoading, status } = api.task.create.useMutation();
	const { refetch } = api.task.getTasks.useQuery({ groupId });

	const createTask = () => {
		if (status === "loading") return;
		else if (title.length === 0) {
			addButton.current?.classList.add("animate-shake-x");
			return;
		} else
			mutate(
				{
					groupId,
					title,
					description: description === "" ? undefined : description,
				},
				{
					onSuccess() {
						void refetch();
						resetForm();
						onCreated && onCreated()
					},
					onError() {
						alert("error");
					},
				}
			);
	};

	const resetForm = () => {
		setIsOpen(false);
		setTitle("");
		setDescription("");
	};

	const handleCancel = () => {
		resetForm()
		onCancel && onCancel()
	}

	return (
		<>
			<div
				className="bg-dark-2 rounded mb-6"
				onFocus={() => setIsOpen(true)}
			>
				{/* Header */}
				<div className="bg-dark-3 flex flex-row items-center justify-between rounded rounded p-6">
					{/* Title input */}
					<div className="relative grow">
						<input
							className={`
                ${isLoading ? "animate-pulse" : ""} 
                font-italic focus:font-not-italic focus:text-light $ peer w-full bg-transparent font-serif font-medium
                outline-none w-full
              `}
							placeholder="New task"
							value={title}
							disabled={isLoading}
							onChange={(e) => setTitle(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === "Enter") void createTask();
							}}
						/>

						<p className="font-light text-light-2 -translate-y-80% absolute left-0 top-0 text-xs peer-placeholder-shown:text-transparent transition-all">
							Title
						</p>
					</div>

					{/* Add/clear button */}
					<div
						className={`
              ${isLoading ? "animate-ping" : ""}
              ${isOpen || title.length > 0
								? "icon-add"
								: "icon-pen"
							}
              text-3xl
            `}
						onAnimationEnd={(e) =>
							e.currentTarget.classList.remove("animate-shake-x")
						}
						ref={addButton}
						onClick={(e) => {
							e.stopPropagation();
							void createTask();
						}}
					/>
				</div>

				{/* Body */}
				{isOpen && (
					<div className="p-6">
						{/* Description */}
						<div className="relative">
							<textarea
								className={`
									${isLoading ? "animate-pulse" : ""} 
									font-italic focus:font-not-italic focus:text-light $ peer w-full bg-transparent font-serif font-medium
									outline-none h-10ex resize-none
								`}
								placeholder="Task description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								onKeyUp={(e) => {
									if (e.key === "Enter") void createTask();
								}}
							/>

							<p className="font-light text-light-2 -translate-y-80% absolute left-0 top-0 text-xs peer-placeholder-shown:text-transparent transition-all">
								Description
							</p>
						</div>

						{/* Buttons */}
						<div
							onClick={handleCancel}
							className="button-danger mx-auto"
						>
							Cancel
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CreateTaskForm;
