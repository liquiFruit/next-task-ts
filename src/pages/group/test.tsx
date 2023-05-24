import Link from "next/link";
import { useGroup, useGroups } from "~/hooks/groups";

const Test: React.FC = () => {
	// const { groups, fetchGroups } = useGroups();
	const { group, fetchGroup } = useGroup("clhj7uk8s0000wfsgj156r4n2");
	

	return (
		<>
      {/* {`Group: ${group?.title}`} */}
      <div className="button-slate">Fetch Groups</div>
			<Link href="/" className="button-success">
				Go home
			</Link>
		</>
	);
};

export default Test;
