import { useState, useRef } from "react";

import { api } from "~/utils/api";

const CreateTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const addButton = useRef<HTMLDivElement>(null);
  const { mutate, isLoading, status } = api.task.create.useMutation();
  const { refetch } = api.task.get.useQuery();

  const createTask = () => {
    if (status === "loading") return;
    else if (title.length === 0) {
      addButton.current?.classList.add("animate-shake-x");
      return;
    } else
      mutate(
        { title },
        {
          onSuccess() {
            void refetch();
            setTitle("");
          },
          onError() {
            alert("error");
          },
        }
      );
  };
  return (
    <>
      <div className="bg-dark-3 mb-6 mt-3 flex flex-row items-center justify-between rounded rounded p-6">
        <input
          className={`${
            isLoading ? "animate-pulse" : ""
          } font-italic focus:font-not-italic focus:text-light w-full bg-transparent font-serif font-medium outline-none`}
          placeholder="Next task"
          value={title}
          disabled={isLoading}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") void createTask();
          }}
        />
        <div
          onAnimationEnd={(e) =>
            e.currentTarget.classList.remove("animate-shake-x")
          }
          ref={addButton}
          onClick={(e) => {
            e.stopPropagation();
            void createTask();
          }}
          className={`${
            isLoading ? "animate-ping" : ""
          } i-solar-add-square-line-duotone text-3xl`}
        />
      </div>
    </>
  );
};

export default CreateTaskForm;
