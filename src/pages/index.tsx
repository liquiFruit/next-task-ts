import type { NextPage } from "next";
import type { Task } from "@prisma/client";

import Navbar from "~/components/layout/Navbar";
import Card from "~/components/statistics/Card";

import useTaskStore from "~/stores/tasks";
import { useRef, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Home: NextPage = () => {
  const sesh = useSession();

  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const { data } = api.task.get.useQuery();

  setTasks(data ?? []);

  return (
    <>
      <div className="bg-dark-1 min-h-screen p-6">
        <Navbar />

        {sesh.status === "authenticated" && (
          <>
            <Statistics tasks={tasks} />
            <CreateTaskForm />
            <TaskGroup tasks={tasks} />
          </>
        )}
      </div>
    </>
  );
};
export default Home;

const Statistics: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const timeDoingTasks = (): number => {
    var total = 0;
    tasks.forEach((task, _i, _a) => {
      if (!task.complete || !task.completedAt || !task.createdAt) return;

      var duration = task.completedAt.getTime() - task.createdAt.getTime();
      total += duration;
    });
    return total / (1000 * 60);
  };

  const averageTimePerTask = (): number => {
    return timeDoingTasks() / tasks.filter((task) => task.complete).length;
  };

  return (
    <div className="aspect-[1/0.66] grid grid-cols-3 gap-2">
      <Card
        className="col-span-2"
        stat={`${Math.ceil(timeDoingTasks())} min`}
        title="time in tasks"
      />

      <Card
        stat={tasks.filter((task) => task.complete).length.toString()}
        title="complete"
      />

      <Card
        stat={tasks.filter((task) => !task.complete).length.toString()}
        title="incomplete"
      />

      <Card
        className="col-span-2"
        stat={`${Math.ceil(averageTimePerTask())} min`}
        title="average time per task"
      />
    </div>
  );
};

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

type TaskOperations = {
  updateTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
};

const TaskGroup: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const { mutate: updateMutation } = api.task.update.useMutation();
  const { mutate: deleteMutation } = api.task.delete.useMutation();

  const { refetch } = api.task.get.useQuery();
  const operations: TaskOperations = {
    updateTask: (id: string, completed: boolean) => {
      updateMutation(
        { id, completed },
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

const Task: React.FC<{ task: Task; operations: TaskOperations }> = ({
  task,
  operations: { updateTask, deleteTask },
}) => {
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
            e.currentTarget.classList.add("animate-ping");
            updateTask(task.id, !task.complete);
          }}
          className={` i-solar-check-square-line-duotone text-3xl ${
            task.complete
              ? "text-success animate-count-1 animate-reverse animate-ping"
              : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="p-6 pt-3">
          <div className="flex flex-row flex-wrap gap-x-6 gap-y-1">
            {task.completedAt ? (
              <div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
                <div className="i-solar-check-square-line-duotone scale-125" />
                <p>{`${dayjs(task.completedAt).fromNow()}`}</p>
              </div>
            ) : (
              <div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
                <div className="i-solar-alarm-line-duotone scale-125" />
                <p>{`${dayjs(task.createdAt).fromNow()}`}</p>
              </div>
            )}
            <div className="children:text-light-2/40 flex flex-row items-center gap-3 text-sm">
              <div className="i-solar-pie-chart-line-duotone scale-125" />
              <p>{`Personal`}</p>
            </div>
          </div>
          <div className="children:cursor-pointer mt-6 flex flex-row justify-center gap-6 text-3xl">
            <div className="text-warning i-solar-backspace-line-duotone -scale-x-100" />
            <div
              onClick={(e) => {
                deleteTask(task.id);
              }}
              className="text-danger ring-danger/100 rounded-full px-6 py-1.5 text-sm ring"
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
