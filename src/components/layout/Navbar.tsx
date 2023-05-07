import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const sesh = useSession()

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-light-1 text-2xl font-bold">
        <span className="text-primary">Next</span>Task
      </div>

      <div 
        onClick={() => sesh.status === "unauthenticated" ? signIn() : signOut()} className="cursor-pointer bg-light-1 hover:bg-light-2 rounded text-dark text-sm py-1 px-4">
        { sesh.status === "unauthenticated" ? "Sign In" : "Sign Out"}
      </div>
    </div>
  );
};

export default Navbar;
