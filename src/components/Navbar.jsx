import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const getPageTitle = (pathname) => {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname === "/users") return "User Management";
  if (pathname === "/users/new") return "New User";
  if (/^\/users\/\d+\/edit$/.test(pathname)) return "Edit User";
  if (pathname === "/projects") return "Project Management";
  if (pathname === "/projects/new") return "New Project";
  if (/^\/projects\/\d+\/edit$/.test(pathname)) return "Edit Project";
  if (pathname === "/tasks") return "Task Management";
  if (pathname === "/tasks/new") return "New Task";
  if (/^\/tasks\/\d+\/edit$/.test(pathname)) return "Edit Task";
  if (pathname === "/profile") return "Profile";
  return "PTMS";
};

const Navbar = () => {
  const { user: currentUser } = useAuth();
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-100 shadow-sm shrink-0">
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-indigo-50 rounded-full px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {currentUser?.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-none">
              {currentUser?.username}
            </p>
            <p className="text-xs text-indigo-500">{currentUser?.roles}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
