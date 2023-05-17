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
        {sesh.status === "authenticated" && (
          <>
            <h2 className="text-2xl">Groups</h2>
            <p>list out groups with cards</p>
            <p>include radial progress bar</p>
            <p>click takes you to groupview page</p>
          </>
        )}
    </>
  );
};

export default Home;

