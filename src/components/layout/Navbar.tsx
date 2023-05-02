import { useSession, signIn, signOut } from "next-auth/react"


const Navbar: React.FC = () => {
    const authStatus = useSession().status
    return (
      <div className="flex flex-row items-center">
        <div className="text-2xl font-bold text-light-1">
          <span className="text-primary">Next</span>Task
        </div>
      </div>
    );
  };

  export default Navbar