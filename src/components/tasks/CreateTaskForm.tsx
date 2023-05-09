import { useState, useRef } from "react";

import { api } from "~/utils/api";

const CreateTaskForm: React.FC = () => {
	const addButton = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const { mutate, isLoading, status } = api.task.create.useMutation();
	const { refetch } = api.task.get.useQuery();

	const createTask = () => {
		if (status === "loading") return;
		else if (title.length === 0) {
			addButton.current?.classList.add("animate-shake-x");
			return;
		} else
			mutate(
				{ 
					title, 
					description: description === "" ? undefined : description 
				},
				{
					onSuccess() {
						void refetch();
						setTitle("");
						setDescription("")
					},
					onError() {
						alert("error");
					},
				}
			);
	};

	return (
		<>
			<div className="bg-dark-2 rounded" onFocus={() => setIsOpen(true)}>
				{/* Header */}
				<div className="bg-dark-3 mb-6 mt-3 flex flex-row items-center justify-between rounded rounded p-6">
					{/* Title input */}
					<div className="relative">
						<input
							className={`
                ${isLoading ? "animate-pulse" : ""} 
                font-italic focus:font-not-italic focus:text-light $ peer w-full bg-transparent font-serif font-medium
                outline-none 
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
              ${
					isOpen || title.length > 0
						? "i-solar-close-square-line-duotone"
						: "i-solar-add-square-line-duotone"
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
					<div className="m-6 mt-0">
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
					</div>
				)}
			</div>
		</>
	);
};

export default CreateTaskForm;
