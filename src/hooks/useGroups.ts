import { useEffect } from "react"
import useGroupStore from "~/stores/groups"
import useTaskStore from "~/stores/tasks"
import { api } from "~/utils/api"


const useGroups = () => {
  const groups = useGroupStore((state) => state.groups)
  const setGroups = useGroupStore((state) => state.setGroups)

  const fetchGroups = async () => {
    const { data } = api.task.getGroups.useQuery()

    useEffect(() => {
      setGroups(data ?? [])
    }, [data])
  }

  return { groups, fetchGroups }
}

export default useGroups