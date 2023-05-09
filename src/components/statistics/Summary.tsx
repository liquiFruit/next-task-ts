import { type Task as ITask } from "@prisma/client";

import Card from "~/components/statistics/Card";

const Summary: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  const timeDoingTasks = (): number => {
    let total = 0;
    tasks.forEach((task, _i, _a) => {
      if (!task.complete || !task.completedAt || !task.createdAt) return;

      const duration = task.completedAt.getTime() - task.createdAt.getTime();
      total += duration;
    });
    return total / (1000 * 60);
  };

  const averageTimePerTask = (): number => {
    return timeDoingTasks() / tasks.filter((task) => task.complete).length;
  };

  return (
    <div className="grid aspect-[1/0.66] grid-cols-3 gap-2">
      <Card
        className="col-span-2"
        stat={`${Math.ceil(timeDoingTasks())} min`}
        title="in total"
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
        title="per task"
      />
    </div>
  );
};

export default Summary;
