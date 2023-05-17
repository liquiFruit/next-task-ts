import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "@unocss/reset/tailwind.css";
import "~/styles/uno.css";
import "~/styles/globals.css";
import Navbar from "~/components/layout/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<div className="bg-dark-1 min-h-screen children:max-w-2xl children:mx-auto p-6">
				<div className="mb-6">
					<Navbar />
				</div>
				<Component {...pageProps} />
			</div>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
