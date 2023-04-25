import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <div className="h-[667px] w-[375px] bg-gradient-to-r from-muted-dark to-muted-light p-6 relative">
        <Navbar />

        <p className="mt-6 mb-2">Up Next</p>
        <TaskList completed={false} />

        <p className="mt-6 mb-2">Completed</p>
        <TaskList completed={true} />
        
        <TaskCreateForm />
      </div>
    </>
  );
};

export default Home;

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-row items-center">
      <p className="mr-auto text-2xl font-black cursor-crosshair">
        <span className="text-primary">Next</span>Task
        </p>

      <div className="
        cursor-pointer
        rounded-full px-4 py-1 
        bg-muted-dark 
        shadow-[4px_6px_10px_rgba(0,0,0,0.25)] hover:scale-[120%] hover:shadow-[8px_10px_10px_rgba(0,0,0,0.25)]
        transition-all duration-300 
      ">
        Login
      </div>
    </div>
  );
};

interface Task {
  title: string
  desc: string
  uid: string
  complete: boolean
}

const TaskList: React.FC<{completed: boolean}> = (props) => {
  const { data: tasks } = api.task.get.useQuery({completed: props.completed})

  return (
    <div className="flex flex-col gap-4">
      { tasks && tasks.map(task => (
        <Task uid={task.uid} title={task.title} desc={task.desc} complete={task.complete} key={task.uid} />
      ))}
    </div>
  );
};

const Task: React.FC<Task> = (task) => {
  const { refetch: refetchIncompletedTasks } = api.task.get.useQuery({completed: false})
  const { refetch: refetchCompletedTasks } = api.task.get.useQuery({completed: true})
  const markCompleted = api.task.update.useMutation({ onSuccess: () => {
    refetchCompletedTasks()
    refetchIncompletedTasks()
  }})

  return (
    <div
      className="
        flex flex-row items-start 
        py-4 rounded-xl
        bg-gradient-to-tr from-[#09332E] to-[#2B564B]
        shadow-lg

        cursor-pointer hover:scale-105 transition-all 
      "
    >
      <div className="grid aspect-square h-full -rotate-90 place-items-center self-start mt-1">
        <p className=" text-2xl font-extrabold">{task.uid.slice(-3).toUpperCase()}</p>
      </div>

      <div className="w-full">
        <p className="text-sm font-semibold">{task.title}</p>
        <p className="text-justify text-xs font-light leading-[14px] tracking-tighter">
          {task.desc}
        </p>
      </div>

      <p 
        className={`self-center mx-4 font-extrabold hover:scale-125 transition-all duration-300 ${task.complete == false ? "text-primary" : "text-muted-dark"}`}
        onClick={() => markCompleted.mutate({uid: task.uid, completed: !task.complete})}
      >
        { task.complete ? "Redo" : "Finish"}
      </p>
    </div>
  );
};

import { useRef } from "react"; 
const TaskCreateForm : React.FC = () => {
  const [isTitleFocused, setIsTitleFocused] = useState(false)
  const [title, setTitle] = useState("")
  const titleRef = useRef<HTMLInputElement | null>(null)

  const [isDescFocused, setIsDescFocused] = useState(false)
  const [desc, setDesc] = useState("")
  const descRef = useRef<HTMLTextAreaElement | null>(null)

  const { refetch: refetchIncompletedTasks } = api.task.get.useQuery({completed: false})
  const { refetch: refetchCompletedTasks } = api.task.get.useQuery({completed: true})
  const createTask = api.task.create.useMutation({ onSuccess: () => {
    refetchCompletedTasks()
    refetchIncompletedTasks()
    setTitle("")
    titleRef.current && (titleRef.current.value = "")
    setDesc("")
    descRef.current && (descRef.current.value = "")
  }})
  const handleSubmit = () => {
    if (title.length == 0 || desc.length == 0) return

    createTask.mutate({title, desc})
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 backdrop-blur-lg">
      <div className="flex flex-row gap-4 items-center mb-4">
        <div 
          className="grow ring ring-white/50 rounded-xl py-1 px-3 relative cursor-pointer"
          onClick={() => titleRef.current?.focus()} 
          onBlur={() => setIsTitleFocused(false)}
        >
          <p className={`absolute text-primary font-bold transition-all cursor-pointer
            ${(!isTitleFocused && title.length == 0) ? "scale-150 translate-y-2.5 translate-x-2.5" : ""}
          `}>
            Title
          </p>
          <input
            onFocus={() => setIsTitleFocused(true)}
            ref={titleRef} type="text" 
            className="w-full bg-transparent outline-none mt-5 text-white cursor-pointer" 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <svg 
          className={`h-16 aspect-square cursor-pointer transition-all 
            ${ (title.length > 0 && desc.length > 0) ? "hover:scale-110": ""}`} 
          viewBox="0 0 24 24"
          onClick={handleSubmit}
        >
          <g fill="none" className="stroke-white/50" strokeWidth="1.5">
            <path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" opacity=".5"></path>
            <path strokeLinecap="round" className={(title.length > 0 && desc.length > 0) ? "stroke-primary" : undefined} d="M15 12h-3m0 0H9m3 0V9m0 3v3"></path>
          </g>
        </svg>
      </div>

      <div 
        className="ring ring-white/50 rounded-xl py-1 px-3 relative cursor-pointer"
        onClick={() => descRef.current?.focus()} 
        onBlur={() => setIsDescFocused(false)}
      >
        <p className={`absolute text-primary font-bold transition-all cursor-pointer
          ${(!isDescFocused && desc.length == 0) ? "scale-150 translate-y-2.5 translate-x-2.5" : ""}
        `}>
          Desc
        </p>
        <textarea
          onFocus={() => setIsDescFocused(true)}
          ref={descRef} 
          className="w-full resize-none bg-transparent outline-none mt-5 text-white cursor-pointer" 
          onChange={(e) => setDesc(e.target.value)} 
        />
      </div>
    </div>
  )
}