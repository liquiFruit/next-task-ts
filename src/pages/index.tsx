import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="h-[667px] w-[375px] bg-gradient-to-r from-muted-dark to-muted-light p-6">
        <Navbar />
        <TaskList />
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
}

const TaskList: React.FC = () => {
  const tasks: Task[] = [
    {
      uid: "30Z",
      title: "Ahf Dka",
      desc: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
    },
    {
      uid: "8E4",
      title: "Brnho Tscuri",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolorem saepe optio perspiciatis excepturi sint."
    },
  ]
  return (
    <div className="mt-6 flex flex-col gap-4">
      { tasks.map(task => (
        <Task uid={task.uid} title={task.title} desc={task.desc} />
      ))}
    </div>
  );
};

const Task: React.FC<Task> = (task) => {
  return (
    <div
      className="
        flex flex-row items-center 
        py-4 rounded-xl
        bg-gradient-to-tr from-[#09332E] to-[#2B564B]
        shadow-lg

        cursor-pointer hover:scale-105 transition-all 
      "
    >
      <div className="grid aspect-square h-full -rotate-90 place-items-center self-start mt-1">
        <p className=" text-2xl font-extrabold">{task.uid}</p>
      </div>

      <div>
        <p className="text-sm font-semibold">{task.title}</p>
        <p className="text-justify text-xs font-light leading-[14px] tracking-tighter">
          {task.desc}
        </p>
      </div>

      <p className="mx-4 font-extrabold text-primary hover:scale-125 transition-all duration-300">Fiznh</p>
    </div>
  );
};
