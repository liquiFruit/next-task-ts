import { type Task as ITask } from "@prisma/client";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

import Card from "~/components/statistics/Card";

const Summary: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  const timeDoingTasks = (): number => {
    let total = 0;
    tasks.forEach((task, _i, _a) => {
      if (!task.complete || !task.completedAt || !task.createdAt) return;

      const duration = task.completedAt.getTime() - task.createdAt.getTime();
      total += duration;
    });
    return total;
  };

  const averageTimePerTask = (): number => {
    return timeDoingTasks() / tasks.filter((task) => task.complete).length;
  };

  return (
    <div className="grid aspect-[1/0.66] grid-cols-3 gap-2">
      <Card
        className="col-span-2"
        stat={dayjs.duration(timeDoingTasks()).humanize()}
        title="in total"
      />

      <Card
        stat={tasks.filter((task) => task.complete).length.toString()}
        title="complete"
        icon="i-solar-check-square-line-duotone text-success"
      />

      <Card
        stat={tasks.filter((task) => !task.complete).length.toString()}
        title="incomplete"
        icon="i-solar-clipboard-remove-line-duotone text-warning"
      />

      <Card
        className="col-span-2"
        stat={dayjs.duration(averageTimePerTask()).humanize()}
        title="per task"
      />
    </div>
  );
};

export default Summary;
