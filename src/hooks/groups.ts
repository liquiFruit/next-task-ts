import { useEffect } from "react"
import useGroupStore from "~/stores/groups"
import { api } from "~/utils/api"


const useGroups = () => {
  const groups = useGroupStore((state) => state.groups)
  const setGroups = useGroupStore((state) => state.setGroups)

  const fetchGroups = () => {
    const { data } = api.task.getGroups.useQuery()

    useEffect(() => {
      setGroups(data ?? [])
    }, [data])
  }

  return { groups, fetchGroups }
}

const useGroup = (id: string) => {
  const group = useGroupStore((state) => state.groups.get(id))
  const setGroupInStore = useGroupStore((state) => state.setGroup)

  const fetchGroup = async () => {
    const { data } = api.group.get.useQuery(id)

    useEffect(() => {
      if (data) setGroupInStore(data)
    }, [data])
  }

  return { group, fetchGroup }
}

export { useGroups, useGroup }