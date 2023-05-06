import { type NextPage } from "next";
import { useState, useRef } from "react";
import { api } from "~/utils/api";

import { useSession } from "next-auth/react";

import Navbar from "~/components/layout/Navbar";
import Card from "~/components/statistics/Card";
import { Task } from "@prisma/client";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-dark-1 min-h-screen p-6">
        <Navbar />

        {/* <div className="grid grid-flow-dense grid-cols-3 gap-2 grid-rows-2 w-full aspect-[1/0.66]">
          <Card className="col-span-2"/>          
          <Card className="row-span-2"/>          
          <Card />          
          <Card />          
        </div> */}

        <TaskGroup />
      </div>
    </>
  );
};

export default Home;

const Task: React.FC<{ task: Task }> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleComplete = () => task.complete = !task.complete
  return (
    <div className="bg-dark-2 rounded">
      <div 
        className="bg-dark-3 flex flex-row items-center justify-between rounded p-6"
        onClick={(e) => setIsOpen(!isOpen)}
      >
        <p className="font-serif font-medium">{task.title}</p>
        <div
          onClick={(e) => {e.stopPropagation(); toggleComplete();}}
          className={`i-solar-check-square-line-duotone text-3xl ${
            task.complete && "text-success"
          }`}
        />
      </div>

      {isOpen && (
        <div className="p-6 pt-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-1">
              <div className="i-solar-hourglass-line-line-duotone inline-block" />
              <p className="text-light-2 inline-block">{task.duration}</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <div className="i-solar-calendar-mark-line-duotone inline-block" />
              <p className="text-light-2 inline-block">Once-off</p>
            </div>

            <div className="flex flex-row items-center gap-1">
              <div className="i-solar-target-line-duotone inline-block" />
              <p className="text-light-2 inline-block">{}</p>
            </div>
          </div>

          <p className="text-light-2 mt-3 text-justify text-sm">{task.desc}</p>

          <div className="children:cursor-pointer mt-6 flex flex-row justify-center gap-6 text-3xl">
            <div className="text-warning i-solar-backspace-line-duotone -scale-x-100" />
            <div className="text-danger i-solar-notification-lines-remove-line-duotone" />
          </div>
        </div>
      )}
    </div>
  );
};

const TaskGroup: React.FC = () => {
  const tasks = api.task.get.useQuery();

  return (
    <>
      <div className="flex flex-col gap-6">
        {tasks.data?.map((task, _i, _array) => (
          <Task task={task} key={task.uid} />
        ))}
      </div>
    </>
  );
};
