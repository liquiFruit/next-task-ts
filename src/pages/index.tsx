import type { NextPage } from "next";
import type { Task } from "@prisma/client";

import Navbar from "~/components/layout/Navbar";
import useTaskStore from "~/stores/tasks";
import { useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const { data } = api.task.get.useQuery();

  setTasks(data ?? [])

  return (
    <>
      <div className="bg-dark-1 min-h-screen p-6">
        <Navbar />

        <CreateTaskForm />
        <TaskGroup tasks={tasks} />
      </div>
    </>
  );
};
export default Home;

const CreateTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const { mutate, isLoading } = api.task.create.useMutation();
  const { refetch } = api.task.get.useQuery();
  const createTask = async () => {
    mutate(
      { title },
      {
        onSuccess() {
          refetch();
          setTitle("");
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
          } font-italic focus:font-not-italic focus:text-light bg-transparent font-serif font-medium outline-none`}
          placeholder="Next task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          onAnimationEnd={(e) => e.currentTarget.classList.remove("animate-shake-x")}
          onClick={(e) => {
            e.stopPropagation();
            if (title.length > 0) createTask()
            else e.currentTarget.classList.add("animate-shake-x")
          }}
          className={`${
            isLoading ? "animate-ping" : ""
          } i-solar-add-square-line-duotone text-3xl`}
        />
      </div>
    </>
  );
};


type TaskOperations = { 
  updateTask: (id: string, completed: boolean) => void,
  deleteTask: (id: string) => void
}

const TaskGroup: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const {mutate: updateMutation} = api.task.update.useMutation()
  const {mutate: deleteMutation} = api.task.delete.useMutation()

  const { refetch } = api.task.get.useQuery()
  const operations: TaskOperations = {
    updateTask: async (id: string, completed: boolean) => {
      await updateMutation({id, completed}, {
        onSuccess: () => refetch()
      })
    },

    deleteTask: async (id: string) => {
      await deleteMutation({id}, {
        onSuccess: () => refetch()
      })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {tasks?.map((task, _i, _a) => (
          <Task key={task.id} task={task} operations={operations} />
        ))}
      </div>
    </>
  );
};

const Task: React.FC<{ task: Task, operations: TaskOperations }> = ({ task, operations: {updateTask, deleteTask} }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-dark-2 rounded">
      <div
        className="bg-dark-3 flex flex-row items-center justify-between rounded p-6"
        onClick={(e) => setIsOpen(!isOpen)}
      >
        <p className="font-serif font-medium">{task.title}</p>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.classList.add("animate-ping")
            updateTask(task.id, !task.complete)
          }}
          className={` i-solar-check-square-line-duotone text-3xl ${
            task.complete && "text-success animate-ping animate-count-1 animate-reverse"
          }`}
        />
      </div>

      {isOpen && (
        <div className="p-6 pt-3">
          <div className="children:cursor-pointer mt-6 flex flex-row justify-center gap-6 text-3xl">
            <div className="text-warning i-solar-backspace-line-duotone -scale-x-100" />
            <div
              onClick={(e) => {
                deleteTask(task.id)
              }}
              className="text-danger i-solar-notification-lines-remove-line-duotone"
            />
          </div>
        </div>
      )}
    </div>
  );
};
