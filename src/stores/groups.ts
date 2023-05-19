import { create } from "zustand"
import type { TaskGroup } from "@prisma/client"


type GroupStore = {
  groups: Map<string, TaskGroup>,
  setGroups: (new_groups: TaskGroup[]) => void,
}

const useGroupStore = create<GroupStore>((set) => ({
  groups: new Map(),
  setGroups: (new_groups) => set(state => {
    new_groups.forEach(group => {
      state.groups.set(group.id, group)
    })

    return { groups: state.groups }
  })
}))


export default useGroupStore