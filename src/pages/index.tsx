import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { type Task as ITask } from "@prisma/client";

import Navbar from "~/components/layout/Navbar";
import StatsSummary from "~/components/statistics/Summary";
import TaskGroup from "~/components/tasks/TaskGroup";
import CreateTaskForm from "~/components/tasks/CreateTaskForm";

import useTaskStore from "~/stores/tasks";
import { api } from "~/utils/api";


const Home: NextPage = () => {

  const sesh = useSession();

  const { data } = api.task.getGroups.useQuery()

  return (
    <>
      <div className="bg-dark-1 min-h-screen children:max-w-2xl children:mx-auto p-6">
        <div className="mb-6"><Navbar /></div>

        {sesh.status === "authenticated" && (
          <>
            {data?.map((group) => (
              <TaskGroup title={group.title} groupId={group.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default Home;

