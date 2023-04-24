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
      <p className="mr-auto text-2xl font-black">NextTask</p>

      <div className="rounded-full bg-muted-dark px-4 py-1 shadow-[8px_4px_10px_rgba(0,0,0,0.25)]">
        Login
      </div>
    </div>
  );
};

const TaskList: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Task
        uid="30Z"
        title="Ahf Dka"
        desc="
          Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        "
      />

      <Task
        uid="8E4"
        title="Brnho Tscuri"
        desc="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolorem saepe optio perspiciatis excepturi sint.
        "
      />
    </div>
  );
};

const Task: React.FC<{ title: string; desc: string; uid: string }> = ({
  title,
  desc,
  uid,
}) => {
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
      <div className="grid aspect-square h-full -rotate-90 place-items-center">
        <p className=" text-2xl font-extrabold">{uid}</p>
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-justify text-xs font-light leading-[14px] tracking-tighter">
          {desc}
        </p>
      </div>

      <p className="mx-4 font-extrabold text-[#47FFB3] hover:scale-125 transition-all">Fiznh</p>
    </div>
  );
};
