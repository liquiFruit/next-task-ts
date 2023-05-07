import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const sesh = useSession();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-light-1 text-2xl font-bold">
        <span className="text-primary">Next</span>Task
      </div>

      <div
        onClick={() => {sesh.status === "unauthenticated" ? void signIn() : void signOut()}}
        className="bg-light-1 hover:bg-light-2 text-dark cursor-pointer rounded px-4 py-1 text-sm"
      >
        {sesh.status === "unauthenticated" ? "Sign In" : "Sign Out"}
      </div>
    </div>
  );
};

export default Navbar;
