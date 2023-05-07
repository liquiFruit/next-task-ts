import { create } from "zustand"
import type { Task } from "@prisma/client"


type TaskStore = {
    tasks: Task[],
    setTasks: (new_tasks: Task[]) => void,
    toggleTask: (id: string) => void,
}
const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    setTasks: (new_tasks) => set(state => {
        const new_state = state
        new_state.tasks = new_tasks
        return new_state
    }),
    toggleTask: (id) => set(state => ({
        tasks: state.tasks.map((task, _i, _a) => {
            if (task.id === id) {
                return { ...task, complete: !task.complete }
            } else return task
        })
    }))
}))


export default useTaskStore