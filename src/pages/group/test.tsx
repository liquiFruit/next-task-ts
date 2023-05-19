import Link from "next/link";
import useGroups from "~/hooks/useGroups";

const Test: React.FC = () => {
	const { groups, fetchGroups } = useGroups();
  fetchGroups()

  return (<>
    <Link href="/" className="button-success">Go home</Link>
  </>)
}

export default Test 