import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { api } from "~/utils/api";
import DropdownCard from "~/components/UI/DropdownCard";
import Link from "next/link";

const Home: NextPage = () => {
	const sesh = useSession();

	const { data } = api.task.getGroups.useQuery();

	return (
		<>
			{sesh.status === "authenticated" && (
				<>
					<div className="mb-2 flex flex-row justify-between items-center">
						<h2 className="text-2xl ">Groups</h2>
						<div className="icon-add text-2xl ml-auto" />
					</div>
					<div className="flex flex-col gap-2">
						{data?.map((g) => (
							<DropdownCard
								header={
									<div className="w-full flex flex-row justify-between items-center">
										<p className="text-xl tracking-widest font-200">
											{g.title}
										</p>
										<svg
											viewBox="0 0 100 100"
											className="h-5 scale-4/2/21 -translate-x-1/2"
										>
											<g transform="rotate(-90 50 50)">
												<circle
													className="stroke-10 stroke-light-2/5 fill-transparent"
													cx={50}
													cy={50}
													r={40}
												/>
												<circle
													className="stroke-10 stroke-primary fill-transparent"
													cx={50}
													cy={50}
													r={40}
													strokeLinecap="round"
													strokeDasharray={
														2 * Math.PI * 40
													}
												>
													<animate
														attributeName="stroke-dashoffset"
														dur="1s"
														from={2 * Math.PI * 40}
														to={
															(1 - 0.9) *
															2 *
															Math.PI *
															40
														}
														fill="freeze"
														calcMode="spline"
														keyTimes="0;1"
														keySplines=".25 .1 .25 1"
													/>
												</circle>
											</g>
											<text
												x="50"
												y="50"
												text-anchor="middle"
												alignment-baseline="middle"
												className="text-2xl fill-light font-black"
											>
												98%
											</text>
										</svg>
									</div>
								}
								body={
									<div className="flex flex-row flex-wrap gap-4 children:grow children:text-center ">
										<Link href={`/group/${g.id}`}>
											<div className="button-primary">
												View
											</div>
										</Link>
										<div className="button-warning">
											Archive
										</div>
										<div className="button-danger">
											Delete
										</div>
									</div>
								}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
