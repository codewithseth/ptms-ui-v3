import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { dashboardStats, tasks, projects } from "../data/mockData";

const StatCard = ({ label, value, color, icon }) => (
  <Card className="flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg shadow-sm ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  </Card>
);

const statusConfig = {
  done: { label: "Done", className: "bg-green-100 text-green-700" },
  in_progress: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
  },
  todo: { label: "Todo", className: "bg-gray-100 text-gray-600" },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const recentTasks = tasks.slice(0, 5);
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Total Users"
          value={dashboardStats.totalUsers}
          color="bg-indigo-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          }
        />
        <StatCard
          label="Projects"
          value={dashboardStats.totalProjects}
          color="bg-violet-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          }
        />
        <StatCard
          label="Total Tasks"
          value={dashboardStats.totalTasks}
          color="bg-blue-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />
        <StatCard
          label="Done"
          value={dashboardStats.tasksDone}
          color="bg-green-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="In Progress"
          value={dashboardStats.tasksInProgress}
          color="bg-yellow-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          label="Todo"
          value={dashboardStats.tasksTodo}
          color="bg-gray-400"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          }
        />
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Tasks
            </h2>
            <button
              onClick={() => navigate("/tasks")}
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    Project #{task.project_id}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[task.status].className}`}
                >
                  {statusConfig[task.status].label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Projects */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Recent Projects
            </h2>
            <button
              onClick={() => navigate("/projects")}
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="py-2 border-b border-gray-50 last:border-0"
              >
                <p className="text-sm font-medium text-gray-700">
                  {project.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
