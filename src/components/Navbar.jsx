import { useLocation } from "react-router-dom";
import { currentUser } from "../data/mockData";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/users": "User Management",
  "/projects": "Project Management",
  "/tasks": "Task Management",
  "/profile": "Profile",
};

const Navbar = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "PTMS";

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-100 shadow-sm shrink-0">
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-indigo-50 rounded-full px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-none">
              {currentUser.username}
            </p>
            <p className="text-xs text-indigo-500">{currentUser.roles}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
