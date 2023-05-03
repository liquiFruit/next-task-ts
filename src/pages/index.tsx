import { type NextPage } from "next";
import { useState, useRef } from "react";
import { api } from "~/utils/api";

import { useSession } from "next-auth/react";

import Navbar from "~/components/layout/Navbar";
import Card from "~/components/statistics/Card";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-dark-1 min-h-screen p-6">
        <Navbar />

        <div className="grid grid-flow-dense grid-cols-3 gap-2 grid-rows-2 w-full aspect-[1/0.66]">
          <Card className="col-span-2"/>          
          <Card className="row-span-2"/>          
          <Card />          
          <Card />          
        </div>

        <Task task={{title: "Create a design portfolio", complete: false, desc: "", uid: ""}} />
      </div>
    </>
  );
};

export default Home;

const TaskList: React.FC<{ completed: boolean }> = (props) => {
  const { data: tasks } = api.task.get.useQuery({ completed: props.completed });

  return (
    <div className="flex flex-col gap-4">
      {tasks &&
        tasks.map((task) => (
          <Task
            uid={task.uid}
            title={task.title}
            desc={task.desc}
            complete={task.complete}
            key={task.uid}
          />
        ))}
    </div>
  );
};

const Task: React.FC<{task: Task}> = (props) => {
  // const { refetch: refetchIncompletedTasks } = api.task.get.useQuery({
  //   completed: false,
  // });
  // const { refetch: refetchCompletedTasks } = api.task.get.useQuery({
  //   completed: true,
  // });
  // const markCompleted = api.task.update.useMutation({
  //   onSuccess: () => {
  //     refetchCompletedTasks();
  //     refetchIncompletedTasks();
  //   },
  // });

  return (
    <div className="bg-dark-2 rounded">
      <div className="bg-dark-3 flex flex-row items-center justify-between rounded p-6">
        <p className="font-serif font-medium">{props.task.title}</p>
        <div className="i-solar-check-square-line-duotone text-success -translate-x-25% scale-150 text-xl" />
      </div>

      <div className="p-6 pt-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-1">
            <div className="i-solar-hourglass-line-line-duotone inline-block" />
            <p className="text-light-2 inline-block">25min</p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="i-solar-calendar-mark-line-duotone inline-block" />
            <p className="text-light-2 inline-block">Once-off</p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="i-solar-target-line-duotone inline-block" />
            <p className="text-light-2 inline-block">Work</p>
          </div>
        </div>

        <p className="text-light-2 mt-3 text-justify text-sm">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>

        <div className="mt-6 flex flex-row justify-between">
          <div className="ring-warning/50 hover:bg-warning/10 text-warning flex w-fit flex-row items-center gap-2 rounded-full px-4 py-2 ring">
            <div className="i-solar-backspace-line-duotone -scale-x-100" />
            <p className="text-warning/70 text-sm">Untrack</p>
          </div>

          <div className="ring-danger/50 text-danger flex w-fit flex-row items-center gap-2 rounded-full px-4 py-2 ring">
            <div className="i-solar-notification-lines-remove-line-duotone" />
            <p className="text-danger/70 text-sm">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskCreateForm: React.FC = () => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement | null>(null);

  const [isDescFocused, setIsDescFocused] = useState(false);
  const [desc, setDesc] = useState("");
  const descRef = useRef<HTMLTextAreaElement | null>(null);

  const { refetch: refetchIncompletedTasks } = api.task.get.useQuery({
    completed: false,
  });
  const { refetch: refetchCompletedTasks } = api.task.get.useQuery({
    completed: true,
  });
  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      refetchCompletedTasks();
      refetchIncompletedTasks();
      setTitle("");
      titleRef.current && (titleRef.current.value = "");
      setDesc("");
      descRef.current && (descRef.current.value = "");
    },
  });
  const handleSubmit = () => {
    if (title.length == 0 || desc.length == 0) return;

    createTask.mutate({ title, desc });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 backdrop-blur-lg">
      <div className="mb-4 flex flex-row items-center gap-4">
        <div
          className="relative grow cursor-pointer rounded-xl px-3 py-1 ring ring-white/50"
          onClick={() => titleRef.current?.focus()}
          onBlur={() => setIsTitleFocused(false)}
        >
          <p
            className={`text-primary absolute cursor-pointer font-bold transition-all
            ${
              !isTitleFocused && title.length == 0
                ? "translate-x-2.5 translate-y-2.5 scale-150"
                : ""
            }
          `}
          >
            Title
          </p>
          <input
            onFocus={() => setIsTitleFocused(true)}
            ref={titleRef}
            type="text"
            className="mt-5 w-full cursor-pointer bg-transparent text-white outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <svg
          className={`aspect-square h-16 cursor-pointer transition-all 
            ${title.length > 0 && desc.length > 0 ? "hover:scale-110" : ""}`}
          viewBox="0 0 24 24"
          onClick={handleSubmit}
        >
          <g fill="none" className="stroke-white/50" strokeWidth="1.5">
            <path
              d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
              opacity=".5"
            ></path>
            <path
              strokeLinecap="round"
              className={
                title.length > 0 && desc.length > 0
                  ? "stroke-primary"
                  : undefined
              }
              d="M15 12h-3m0 0H9m3 0V9m0 3v3"
            ></path>
          </g>
        </svg>
      </div>

      <div
        className="relative cursor-pointer rounded-xl px-3 py-1 ring ring-white/50"
        onClick={() => descRef.current?.focus()}
        onBlur={() => setIsDescFocused(false)}
      >
        <p
          className={`text-primary absolute cursor-pointer font-bold transition-all
          ${
            !isDescFocused && desc.length == 0
              ? "translate-x-2.5 translate-y-2.5 scale-150"
              : ""
          }
        `}
        >
          Desc
        </p>
        <textarea
          onFocus={() => setIsDescFocused(true)}
          ref={descRef}
          className="mt-5 w-full cursor-pointer resize-none bg-transparent text-white outline-none"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
    </div>
  );
};
